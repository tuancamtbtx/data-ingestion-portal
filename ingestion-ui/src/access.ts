export default (initialState: API.InitStateProps) => {
  let permissions = initialState?.user?.permissions || [];
  let permissionsMap = permissions.map((item: any) => {
    return item.name;
  });
  return {
    canSeeCollinDashboard: permissionsMap.includes('canSeeCollinDashboard'),
    canSeeCentralDashboard: permissionsMap.includes('canSeeCentralDashboard'),
    canSeeDatalakeDashboard: permissionsMap.includes('canSeeDatalakeDashboard'),

    canSeeBillingInvoice: permissionsMap.includes('canSeeBillingInvoice'),
    canUpdateBillingInvoice: permissionsMap.includes('canUpdateBillingInvoice'),
    canDeleteBillingInvoice: permissionsMap.includes('canDeleteBillingInvoice'),
    canCreateBillingInvoice: permissionsMap.includes('canCreateBillingInvoice'),

    canSeeBillingVendor: permissionsMap.includes('canSeeBillingVendor'),
    canUpdateBillingVendor: permissionsMap.includes('canUpdateBillingVendor'),
    canDeleteBillingVendor: permissionsMap.includes('canDeleteBillingVendor'),
    canCreateBillingVendor: permissionsMap.includes('canCreateBillingVendor'),

    canSeeBillingStatement: permissionsMap.includes('canSeeBillingStatement'),
    canUpdateBillingStatement: permissionsMap.includes(
      'canUpdateBillingStatement',
    ),
    canDeleteBillingStatement: permissionsMap.includes(
      'canDeleteBillingStatement',
    ),
    canCreateBillingStatement: permissionsMap.includes(
      'canCreateBillingStatement',
    ),

    canSeeBudget: permissionsMap.includes('canSeeBudget'),
    canUpdateBudget: permissionsMap.includes('canUpdateBudget'),
    canDeleteBudget: permissionsMap.includes('canDeleteBudget'),
    canCreateBudget: permissionsMap.includes('canCreateBudget'),

    canSeeAlert: permissionsMap.includes('canSeeAlert'),
    canUpdateAlert: permissionsMap.includes('canUpdateAlert'),
    canDeleteAlert: permissionsMap.includes('canDeleteAlert'),
    canCreateAlert: permissionsMap.includes('canCreateAlert'),

    canSeeDataPipeline: permissionsMap.includes('canSeeDataPipeline'),
    canUpdateDataPipeline: permissionsMap.includes('canUpdateDataPipeline'),
    canDeleteDataPipeline: permissionsMap.includes('canDeleteDataPipeline'),
    canCreateDataPipeline: permissionsMap.includes('canCreateDataPipeline'),

    canSeeDataBook: permissionsMap.includes('canSeeDataBook'),
    canUpdateDataBook: permissionsMap.includes('canUpdateDataBook'),
    canDeleteDataBook: permissionsMap.includes('canDeleteDataBook'),
    canCreateDataBook: permissionsMap.includes('canCreateDataBook'),

    canSeeProductCode: permissionsMap.includes('canSeeProductCode'),
    canUpdateProductCode: permissionsMap.includes('canUpdateProductCode'),
    canDeleteProductCode: permissionsMap.includes('canDeleteProductCode'),
    canCreateProductCode: permissionsMap.includes('canCreateProductCode'),

    canSeeDivisionCode: permissionsMap.includes('canSeeDivisionCode'),
    canUpdateDivisionCode: permissionsMap.includes('canUpdateDivisionCode'),
    canDeleteDivisionCode: permissionsMap.includes('canDeleteDivisionCode'),
    canCreateDivisionCode: permissionsMap.includes('canCreateDivisionCode'),

    canSeeEnvironment: permissionsMap.includes('canSeeEnvironment'),
    canUpdateEnvironment: permissionsMap.includes('canUpdateEnvironment'),
    canDeleteEnvironment: permissionsMap.includes('canDeleteEnvironment'),
    canCreateEnvironment: permissionsMap.includes('canCreateEnvironment'),

    canSeeCountryCode: permissionsMap.includes('canSeeCountryCode'),
    canUpdateCountryCode: permissionsMap.includes('canUpdateCountryCode'),
    canDeleteCountryCode: permissionsMap.includes('canDeleteCountryCode'),
    canCreateCountryCode: permissionsMap.includes('canCreateCountryCode'),

    canSeePlatformCode: permissionsMap.includes('canSeePlatformCode'),
    canUpdatePlatformCode: permissionsMap.includes('canUpdatePlatformCode'),
    canDeletePlatformCode: permissionsMap.includes('canDeletePlatformCode'),
    canCreatePlatformCode: permissionsMap.includes('canCreatePlatformCode'),

    canSeeApplicationCode: permissionsMap.includes('canSeeApplicationCode'),
    canUpdateApplicationCode: permissionsMap.includes(
      'canUpdateApplicationCode',
    ),
    canDeleteApplicationCode: permissionsMap.includes(
      'canDeleteApplicationCode',
    ),
    canCreateApplicationCode: permissionsMap.includes(
      'canCreateApplicationCode',
    ),

    canSeeOwnerCode: permissionsMap.includes('canSeeOwnerCode'),
    canUpdateOwnerCode: permissionsMap.includes('canUpdateOwnerCode'),
    canDeleteOwnerCode: permissionsMap.includes('canDeleteOwnerCode'),
    canCreateOwnerCode: permissionsMap.includes('canCreateOwnerCode'),

    canSeeAllocationCode: permissionsMap.includes('canSeeAllocationCode'),
    canUpdateAllocationCode: permissionsMap.includes('canUpdateAllocationCode'),
    canDeleteAllocationCode: permissionsMap.includes('canDeleteAllocationCode'),
    canCreateAllocationCode: permissionsMap.includes('canCreateAllocationCode'),

    canSeeVendorCode: permissionsMap.includes('canSeeVendorCode'),
    canUpdateVendorCode: permissionsMap.includes('canUpdateVendorCode'),
    canDeleteVendorCode: permissionsMap.includes('canDeleteVendorCode'),
    canCreateVendorCode: permissionsMap.includes('canCreateVendorCode'),

    canSeeUserAccess: permissionsMap.includes('canSeeUserAccess'),
    canUpdateUserAccess: permissionsMap.includes('canUpdateUserAccess'),
    canDeleteUserAccess: permissionsMap.includes('canDeleteUserAccess'),
    canCreateUserAccess: permissionsMap.includes('canCreateUserAccess'),

    canSeeRoleAccess: permissionsMap.includes('canSeeRoleAccess'),
    canUpdateRoleAccess: permissionsMap.includes('canUpdateRoleAccess'),
    canDeleteRoleAccess: permissionsMap.includes('canDeleteRoleAccess'),
    canCreateRoleAccess: permissionsMap.includes('canCreateRoleAccess'),

    canSeePermissionAccess: permissionsMap.includes('canSeePermissionAccess'),
    canUpdatePermissionAccess: permissionsMap.includes(
      'canUpdatePermissionAccess',
    ),
    canDeletePermissionAccess: permissionsMap.includes(
      'canDeletePermissionAccess',
    ),
    canCreatePermissionAccess: permissionsMap.includes(
      'canCreatePermissionAccess',
    ),
  };
};
