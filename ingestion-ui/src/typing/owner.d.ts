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

  interface PageInfo_OnwerCodeInfo_ {
    /** 
    1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<OnwerCodeInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_OnwerCodeInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_OnwerCodeInfo_;
  }

  interface Result_OnwerCodeInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: OnwerCodeInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface OnwerCodeInfo {
    id?: string;
    owner_name?: string;
    owner_code?: string;
  }

  interface OwnerCodeInfoVO {
    name?: string;
    owner_name?: string;
    owner_code?: string;
  }

  type definitions_0 = null;
}
