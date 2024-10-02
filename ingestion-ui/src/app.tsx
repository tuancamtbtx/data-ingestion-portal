import { message } from 'antd';
import {
  AxiosRequestConfig,
  RequestConfig,
  RunTimeLayoutConfig,
  history,
} from 'umi';

import RightContent from './components/ProLayout/RightContent';
import WrapperAuth from './components/WrapperAuth';
import { LOGIN_URI } from './constants';
import { getAuthToken, removeAuthToken } from './services/auth';
import { UserDetail, UserInfo, getCurrentUserDetail } from './services/users';
import NoAccessible from '@/pages/403';

export type InitStateProps = {
  user?: UserInfo;
  isLoggedIn: boolean;
  fetchCurrentUserDetail: () => Promise<UserDetail | undefined>;
};

export async function getInitialState(): Promise<InitStateProps> {
  const fetchCurrentUserDetail = async () => {
    try {
      return await getCurrentUserDetail({ skipErrorHandler: true });
    } catch (error) {
      console.log('fetch current user failed', error);
    }
  };

  const userDetail = await fetchCurrentUserDetail();
  return {
    isLoggedIn: !!userDetail,
    user: userDetail,
    fetchCurrentUserDetail,
  };
}

export const layout: RunTimeLayoutConfig = (initData) => {
  return {
    rightContentRender: (headerProps, dom, opts) => <RightContent {...opts} />,
    childrenRender: (children) => {
      return <WrapperAuth>{children}</WrapperAuth>;
    },
    contentWidth: 'Fluid',
    navTheme: 'light',
    loading: initData.loading,
    layout: 'top',
    unAccessible: <NoAccessible />,
    menu: {
      locale: false,
      type: 'group',
    },
    logout: () => {
      removeAuthToken();
      message.success('Đăng xuất thành công!');
      history.push(LOGIN_URI);
    },
  };
};

export const request: RequestConfig = {
  baseURL: process.env.SITE_API_ENDPOINT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorConfig: {
    errorHandler: (error: any, opts) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
      } else if (error.response) {
        if (error.response?.data?.message) {
          message.error(error.response?.data?.message);
        } else {
          message.error(`Response status:${error.response.status}`);
        }
      } else if (error.request) {
        console.log('None response', error);
        message.error('None response! Please retry.');
      } else {
        console.log('None response', error);
        message.error('Request error, please retry.');
      }
    },
  },
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        const authToken = getAuthToken();
        if (authToken) {
          config.headers['Authorization'] = `Bearer ${authToken}`;
        }
      }
      return config;
    },
  ],
};
