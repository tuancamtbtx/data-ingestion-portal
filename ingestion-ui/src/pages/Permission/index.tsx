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

import services from '@/services/permission';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import NoAccessible from '@/pages/403';

const {
  addPermission,
  queryPermissionList,
  deletePermission,
  modifyPermission,
} = services.PermisionController;

/**
 * @param fields
 */
const handleAdd = async (fields: API.UserInfo) => {
  const hide = message.loading('Loading');
  try {
    await addPermission({ ...fields });
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
    await modifyPermission(
      {
        userId: fields.id || '',
      },
      {
        name: fields.name || '',
        email: fields.email || '',
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
const handleRemove = async (selectedRows: API.UserInfo[]) => {
  const hide = message.loading('Loading');
  if (!selectedRows) return true;
  try {
    await deletePermission({
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
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);
  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      tip: 'Permisison Id is unique key',
      hideInForm: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
      render: (name) => {
        return <Tag color="#a4b0be">{name}</Tag>;
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
  ];
  const access = useAccess();

  return (
    <PageContainer
      header={{
        title: 'Permission Configuration',
      }}
    >
      <Access
        accessible={access.canSeePermissionAccess}
        fallback={<NoAccessible />}
      >
        <ProTable<API.PermissionInfo>
          headerTitle="Permission Configuration"
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
            const { data, success } = await queryPermissionList({
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
                User Access &nbsp;&nbsp;
                <a style={{ fontWeight: 600 }}>
                  {selectedRowsState.length}
                </a>{' '}
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
            <Button type="primary">Update</Button>
          </FooterToolbar>
        )}
        <CreateForm
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        >
          <ProTable<API.UserInfo, API.UserInfo>
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
            <ProDescriptions<API.UserInfo>
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
      </Access>
    </PageContainer>
  );
};

export default TableList;
