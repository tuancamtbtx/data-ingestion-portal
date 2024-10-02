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

  interface PageInfo_VendorCodeInfo_ {
    /** 
    1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<VendorCodeInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_VendorCodeInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_VendorCodeInfo_;
  }

  interface Result_VendorCodeInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: VendorCodeInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface VendorCodeInfo {
    id?: string;
    vendor_name?: string;
    vendor_code?: string;
    /** email */
  }

  interface VendorCodeInfoVO {
    name?: string;
    vendor_name?: string;
    vendor_code?: string;
  }

  type definitions_0 = null;
}
