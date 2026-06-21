const email = 'admin@example.com';
const password = 'admin123';
import { API_BASE_URL } from './src/api/config.js';

async function runSmokeTest() {
  console.log('Starting optional live API smoke test...');
  let token = null;

  try {
    console.log(`1. Logging in as ${email}...`);
    const loginRes = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (!loginData?.data?.token) {
      throw new Error('No token returned from login');
    }
    token = loginData.data.token;
    console.log('✅ Login successful, token received.');

    console.log('2. Fetching dashboard referrals...');
    const dashRes = await fetch(`${API_BASE_URL}/referrals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    if (!dashData?.data) {
      throw new Error('Dashboard data is missing');
    }
    console.log('✅ Dashboard referrals fetched.');

    console.log('Smoke test passed successfully!');
  } catch (err) {
    console.error('❌ Smoke test failed:', err.message);
    process.exit(1);
  }
}

runSmokeTest();
