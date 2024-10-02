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

  interface PageInfo_PermissionInfo_ {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<PermissionInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_PermissionInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_PermissionInfo_;
  }

  interface Result_PermissionInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface PermissionInfo {
    id?: string;
    name?: string;
    /** email */
    description?: string;
  }

  interface PermissionInfoVO {
    name?: string;
    /** email */
    description?: string;
  }

  type definitions_0 = null;
}
