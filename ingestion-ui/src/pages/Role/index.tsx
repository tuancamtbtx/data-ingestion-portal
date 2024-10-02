import React, { useRef, useState } from 'react';

import { Button, Drawer, Tag, message } from 'antd';
import { Access, useAccess } from 'umi';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';

import services from '@/services/role';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { COLOR_BY_IDX } from '@/constants';
import NoAccessible from '@/pages/403';

const { addRole, queryRoleList, deleteRole, modifyRole } =
  services.RoleController;

/**
 * @param fields
 */
const handleAdd = async (fields: API.RoleInfo) => {
  const hide = message.loading('Loading');
  try {
    await addRole({ ...fields });
    hide();
    message.success('Create Sucess');
    return true;
  } catch (error) {
    hide();
    message.error('Create Failed');
    return false;
  }
};

/**
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Loading');
  try {
    await modifyRole(
      {
        roleId: fields.id || '',
      },
      {
        name: fields.name || '',
        permissionIds: fields.permissionIds || [],
        description: fields.description || '',
      },
    );
    hide();

    message.success('Update Success');
    return true;
  } catch (error) {
    hide();
    message.error('Update Failed！');
    return false;
  }
};

/**
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RoleInfo[]) => {
  const hide = message.loading('Loading');
  if (!selectedRows) return true;
  try {
    await deleteRole({
      userId: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('Remove Success');
    return true;
  } catch (error) {
    hide();
    message.error('Remove Failed');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.RoleInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RoleInfo[]>([]);

  const columns: ProDescriptionsItemProps<API.RoleInfo>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      tip: 'User Id is unique key',
      hideInForm: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
      render: (_, record: any) => {
        return <Tag color={COLOR_BY_IDX[record.id]}>{record.name}</Tag>;
      },
    },
    {
      title: 'Permisions',
      dataIndex: 'permissions',
      render: (permissions: any) => {
        return (
          <>
            {permissions.map((permission: any) => {
              return (
                <Tag color="#a4b0be" key={permission.name}>
                  {permission.name}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="dashed"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Update
          </Button>
        </>
      ),
    },
  ];
  const access = useAccess();

  return (
    <PageContainer
      header={{
        title: 'Role Configuration',
      }}
    >
      <ProTable<API.RoleInfo>
        headerTitle="Role Configuration"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            Create
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryRoleList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected &nbsp;&nbsp;
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Remove
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.RoleInfo, API.RoleInfo>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.RoleInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
