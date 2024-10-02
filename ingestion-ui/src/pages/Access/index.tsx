import React, { useRef, useState } from 'react';

import { Avatar, Button, Drawer, Tag, message } from 'antd';
import { Access, useAccess } from 'umi';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';

import services from '@/services/access';
import roleService from '@/services/role';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { COLOR_BY_IDX } from '@/constants';
import NoAccessible from '@/pages/403';

const { addUser, queryUserList, deleteUser, modifyUser } =
  services.AccessController;

/**
 * @param fields
 */
const handleAdd = async (fields: API.UserInfo) => {
  const hide = message.loading('Loading');
  try {
    await addUser({ ...fields });
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
    await modifyUser(
      {
        userId: fields.id || '',
      },
      {
        roleId: fields.roleId as number,
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
    await deleteUser({
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
  const access = useAccess();

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
      tip: 'User Id is unique key',
      hideInForm: true,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      valueType: 'text',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
      render: (email) => {
        return <strong>{email}</strong>;
      },
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      valueType: 'image',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record: any) => {
        if (record.avatar) {
          return <Avatar src={record.avatar} alt={record.username} size={36} />;
        } else {
          return (
            <Avatar
              size={36}
              src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
              alt="avatar"
            />
          );
        }
      },
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      request: async () => {
        let sorter,
          filter = {};
        let data = await roleService.RoleController.queryRoleList(
          // FIXME: remove @ts-ignore
          // @ts-ignore
          sorter,
          filter,
        );
        const itemList = data.data?.list || [];
        return itemList.map((item) => ({ label: item.name, value: item.id }));
      },
      render: (_, record: any) => {
        return (
          <Tag color={COLOR_BY_IDX[record.role.id]}>{record.role.name}</Tag>
        );
      },
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

  return (
    <PageContainer
      header={{
        title: 'User Access',
      }}
    >
      <Access accessible={true} fallback={<NoAccessible />}>
        <ProTable<API.UserInfo>
          headerTitle="User Access"
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
            const { data, success } = await queryUserList({
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
