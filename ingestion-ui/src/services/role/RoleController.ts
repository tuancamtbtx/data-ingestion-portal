/* eslint-disable */
import { request } from '@umijs/max';

export async function queryRoleList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addRole(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/v1/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getUserDetail(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/roles/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function modifyRole(
  params: {
    // path
    /** roleId */
    roleId?: string;
  },
  body?: API.RoleInfo,
  options?: { [key: string]: any },
) {
  const { roleId } = params;
  return request<API.Result_UserInfo_>(`/api/v1/roles/${roleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteRole(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_string_>(`/api/v1/roles/${param0}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
