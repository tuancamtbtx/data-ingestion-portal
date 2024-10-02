import React from 'react';

import { Avatar, Dropdown, Spin, Tag } from 'antd';
import { InitDataType, RuntimeConfig } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';

import { COLOR_BY_IDX } from '@/constants';
import { IConfigFromPlugins } from '@@/core/pluginConfig';

export interface RightContentProps {
  userConfig: IConfigFromPlugins['layout'];
  runtimeConfig: RuntimeConfig;
  loading: InitDataType['loading'];
  initialState: InitDataType['initialState'];
  setInitialState: InitDataType['setInitialState'];
}

const RightContent: React.FC<RightContentProps> = ({
  runtimeConfig,
  initialState,
  loading,
}) => {
  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={initialState?.user?.avatar}
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">
        {initialState?.user?.fullname} -{' '}
        <Tag color={COLOR_BY_IDX[initialState?.user?.role.id]}>
          {initialState?.user?.role.name}
        </Tag>
      </span>
    </span>
  );
  if (loading) {
    return (
      <div className="umi-plugin-layout-right">
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    );
  }

  const langMenu = {
    className: 'umi-plugin-layout-menu',
    selectedKeys: [],
    items: [
      {
        key: 'logout',
        label: (
          <>
            <LogoutOutlined />
            <FormattedMessage id="menu.account.logout" />
          </>
        ),
        onClick: () => {
          runtimeConfig?.logout?.(initialState);
        },
      },
    ],
  };

  return (
    <div className="umi-plugin-layout-right anticon">
      {runtimeConfig.logout ? (
        <Dropdown
          menu={langMenu}
          overlayClassName="umi-plugin-layout-container"
        >
          {avatar}
        </Dropdown>
      ) : (
        avatar
      )}
    </div>
  );
};

export default RightContent;
