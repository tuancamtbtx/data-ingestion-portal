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

  interface PageInfo_BudgetInfo_ {
    /** 
    1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<BudgetInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_BudgetInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_BillingInfo_;
  }

  interface Result_BudgetInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: BudgetInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface BudgetInfo {
    id?: string;
    InvoiceMonth?: string;
    Division?: string;
    /** email */
    Country?: string;
    Product: string;
  }

  interface BudgetInfoVO {
    name?: string;
    /** email */
    description?: string;
  }

  type definitions_0 = null;
}
