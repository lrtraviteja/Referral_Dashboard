import Cookies from 'js-cookie';

import { API_BASE_URL } from './config';

export async function fetchWithAuth(endpoint, options = {}) {
  const token = Cookies.get('jwt_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      Cookies.remove('jwt_token');
      window.location.href = '/login';
    }
    const error = new Error(responseJson.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return responseJson;
}
