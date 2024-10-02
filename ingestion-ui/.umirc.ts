import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    'process.env.SITE_API_ENDPOINT':
      process.env.SITE_API_ENDPOINT || 'http://localhost:8080',
  },
  deadCode: {},
  antd: {
    theme: {
      token: {
        colorPrimary: '#00B96B', //'rgb(2, 118, 241)',
        borderRadius: 6,
      },
    },
    configProvider: {},
    appConfig: {},
  },
  history: {
    type: 'hash',
  },
  styles: [
    `body {
        width: 100%;
        height: 100%;
        margin: 0px;
        overflow: initial;
        minHeight: 100vh;
      }
      .ant-menu-item-selected {
        background-color: #2ed573;
        color: #ffffff;
        font-weight: 500;
      }
      .ant-menu-item-group-title {
        color: #000;
        font-weight: 400;
        font-size: 12px;
        padding-top: 24px !important;
      }
      .ant-pro-base-menu-horizontal-item-text {
        font-size: 14px;
        font-weight: 500;
        color: #000;
      }
      .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title, .css-dev-only-do-not-override-lrm56x.ant-menu-light>.ant-menu .ant-menu-submenu-selected >.ant-menu-submenu-title {
        background-color: #ecf0f1;
        padding: 0px 24px;
      }
    }`,
  ],
  access: {},
  model: {},
  initialState: {
    loading: '@/loading.tsx',
  },
  request: {},
  locale: {
    default: 'vi-VN',
    baseSeparator: '-',
    antd: true,
  },
  layout: {
    title: ' ',
    locale: false,
  },

  // helmet: true,
  routes: [
    {
      path: '/login',
      layout: false,
      name: 'login',
      component: './login',
    },
    {
      path: '/',
      redirect: '/central',
    },
    {
      name: 'Configuration',
      key: 'configuration',
      icon: 'SettingOutlined',
      routes: [
        {
          name: 'List Users',
          path: '/access',
          key: 'access',
          access: 'canSeeUserAccess',
          icon: 'UsergroupAddOutlined',
          component: './Access',
        },
        {
          name: 'List Role',
          path: '/roles',
          key: 'roles',
          access: 'canSeeRoleAccess',
          icon: 'ApiOutlined',
          component: './Role',
        },
        {
          name: 'Permissions',
          path: '/permissions',
          key: 'permissions',
          access: 'canSeePermissionAccess',
          icon: 'SafetyCertificateOutlined',
          component: './Permission',
        },
      ],
    },
    {
      path: '/*',
      component: './404',
    },
  ],
  npmClient: 'yarn',
});
