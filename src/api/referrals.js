import { fetchWithAuth } from './client';

export async function getReferrals({ search, sort, id } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  if (id) params.append('id', id);

  const queryString = params.toString();
  const endpoint = `/referrals${queryString ? `?${queryString}` : ''}`;
  
  return fetchWithAuth(endpoint);
}
