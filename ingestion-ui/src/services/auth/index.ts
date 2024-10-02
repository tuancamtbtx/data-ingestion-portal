import { request } from '@umijs/max';

import { LoginResponse } from './auth';
import { RequestOptions } from '@@/plugin-request/request';

export * from './auth.d';

const TOKEN_KEY = 'token';

export function login(data: any, opts?: RequestOptions) {
  return request<LoginResponse>('/api/v1/auth/login', {
    ...opts,
    method: 'POST',
    data: data,
  });
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}
