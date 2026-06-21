import Cookies from 'js-cookie';

export const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api';

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
    throw new Error(responseJson.message || `Request failed with status ${response.status}`);
  }

  return responseJson;
}
