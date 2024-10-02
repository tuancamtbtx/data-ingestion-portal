/* eslint-disable */

declare namespace API {
  interface InitStateProps {
    user?: UserInfo;
    isLoggedIn: boolean;
    fetchCurrentUserDetail: () => Promise<UserDetail | undefined>;
  }
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** email */
    email?: string;
    roleId?: number;
    permissions?: Array<any>;
  }

  interface UserInfoVO {
    name?: string;
    /** email */
    email?: string;
    roleId?: number;
  }

  type definitions_0 = null;
}
