/* eslint-disable */

declare namespace API {
  interface PageInfo {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_RoleInfo_ {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<RoleInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_RoleInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_RoleInfo_;
  }

  interface Result_RoleInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface RoleInfo {
    id?: string;
    name?: string;
    /** email */
    description?: string;
    permissions?: any[];
    permissionIds?: number[];
  }

  interface RoleInfoVO {
    name?: string;
    /** email */
    description?: string;
  }

  type definitions_0 = null;
}
