export const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api';

export async function signin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok || (responseJson.message && !responseJson.data)) {
    throw new Error(responseJson.message || 'Login failed');
  }

  return responseJson;
}
