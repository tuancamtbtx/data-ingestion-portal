import React from 'react';

import { Modal, Select } from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

import permissionService from '@/services/permission';

export interface FormValueType extends Partial<API.RoleInfo> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RoleInfo>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <Modal
    bodyStyle={{
      padding: '32px 40px 48px',
      display: 'flex',
      justifyContent: 'center',
    }}
    destroyOnClose
    title="Update"
    visible={props.updateModalVisible}
    onCancel={() => props.onCancel()}
    footer={null}
  >
    <ProForm
      initialValues={{
        id: props.values.id,
        name: props.values.name,
        description: props.values.description,
        permissions: props.values.permissions,
        permissionIds: props.values.permissions?.map(
          (permission) => permission.id,
        ),
      }}
      onFinish={props.onSubmit}
    >
      <ProFormText
        width="md"
        name="id"
        label="Role ID"
        disabled
        rules={[{ required: true, message: 'Please Enter Role ID' }]}
      />
      <ProFormText
        width="md"
        name="name"
        label="Role Name"
        rules={[{ required: true, message: 'Please Enter Role Name' }]}
      />
      <ProFormText width="md" name="description" label="Description" />
      <ProFormSelect
        name="permissionIds"
        label="Select Permissions"
        placeholder="Select Permissions"
        mode="multiple" // Enable multiple selection
        request={async () => {
          let sorter,
            filter = {};
          let data =
            await permissionService.PermisionController.queryPermissionList(
              // FIXME: remove @ts-ignore
              // @ts-ignore
              sorter,
              filter,
            );
          const itemList = data.data?.list || [];
          return itemList.map((item) => ({ label: item.name, value: item.id }));
        }}
        // options={itemList.map(item => ({ label: item.name, value: item.id }))}
        rules={[{ required: true, message: 'Please select at least one item' }]}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;
