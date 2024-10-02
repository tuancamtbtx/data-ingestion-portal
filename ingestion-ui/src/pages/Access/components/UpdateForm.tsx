import React from 'react';

import { Modal, Select } from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

import roleService from '@/services/role';

export interface FormValueType extends Partial<API.UserInfo> {
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
  values: Partial<API.UserInfo>;
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
        email: props.values.email,
        roleId: props.values.roleId,
      }}
      onFinish={props.onSubmit}
    >
      <ProFormText
        width="md"
        name="id"
        label="User ID"
        disabled
        rules={[{ required: true, message: 'Please Enter Role ID' }]}
      />
      <ProFormText width="md" name="email" label="Email" disabled />
      <ProFormSelect
        name="roleId"
        label="Select Role"
        placeholder="Select Role"
        request={async () => {
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
        }}
        rules={[{ required: true, message: 'Please select role' }]}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;
