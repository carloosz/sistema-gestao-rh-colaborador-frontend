/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { localStorageKeys } from '@/utils/localStorageKeys';
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const backURL = baseURL?.replace('/api', '');

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async config => {
    if (typeof window === 'undefined') return config;

    const accessToken = localStorage.getItem(localStorageKeys.accessToken);

    if (
      accessToken &&
      !config.url?.includes('auth/local') &&
      !config.url?.includes('auth/reset-password') &&
      !config.url?.includes('auth/refresh-token')
    ) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;

export async function refreshAccessToken() {
  try {
    const credentials = localStorage.getItem(localStorageKeys.refreshToken);

    if (typeof credentials === 'string') {
      const { data } = await api.post('/auth/refresh-token', {
        refreshToken: credentials,
      });
      localStorage.setItem(localStorageKeys.accessToken, data.jwt);
      localStorage.setItem(localStorageKeys.refreshToken, data.refreshToken);

      return data?.jwt;
    }
  } catch (error) {
    localStorage.removeItem(localStorageKeys.accessToken);
    localStorage.removeItem(localStorageKeys.refreshToken);
    localStorage.removeItem(localStorageKeys.user);
  }

  localStorage.removeItem(localStorageKeys.accessToken);
  localStorage.removeItem(localStorageKeys.refreshToken);
  localStorage.removeItem(localStorageKeys.user);
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== '/auth/refresh-token'
    ) {
      originalRequest.retry = true;
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
