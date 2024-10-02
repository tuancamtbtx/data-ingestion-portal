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

  interface PageInfo_BillingInfo_ {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<BillingInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_BillingInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_BillingInfo_;
  }

  interface Result_BillingInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: BillingInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface BillingInfo {
    BillingId?: string;
    InvoiceMonth?: string;
    Division?: string;
    GroupName?: string;
    GroupId?: string;
    VendorName?: string;
    Cost?: string;
    ActualCost?: string;
    /** email */
    Country?: string;
    Product: string;
    Enviroment: string;
  }

  interface BillingInfoVO {
    BillingId?: string;
    InvoiceMonth?: string;
    Division?: string;
    GroupName?: string;
    GroupId?: string;
    VendorName?: string;
    Cost?: string;
    ActualCost?: string;
    /** email */
    Country?: string;
    Product: string;
    Enviroment: string;
  }

  type definitions_0 = null;
}
