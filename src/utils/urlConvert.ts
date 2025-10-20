import { baseURL } from '@/services/api';

export function urlConvert(url?: string) {
  if (url) {
    const api_url = baseURL?.replace('/api/', '');
    return `${api_url}${url}`;
  }
  return '';
}
