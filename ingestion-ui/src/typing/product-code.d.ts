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

  interface PageInfo_ProductCodeInfo_ {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<ProductCodeInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_ProductCodeInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_RoleInfo_;
  }

  interface Result_ProductCodeInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface ProductCodeInfo {
    id?: string;
    product_name?: string;
    product_code?: string;
    /** email */
  }

  interface ProductCodeInfoVO {
    name?: string;
    product_name?: string;
    product_code?: string;
  }

  type definitions_0 = null;
}
