
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function testWatchlist() {
  try {
    console.log('1. Registering/Logging in test user...');
    let token;
    try {
        const regRes = await axios.post(`${BASE_URL}/auth/register`, {
            username: 'testuser_wl',
            email: 'test_wl@example.com',
            password: 'password123'
        });
        console.log('   Registered.');
        // Login to get token just in case register doesn't return it or to be sure
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test_wl@example.com',
            password: 'password123'
        });
        token = loginRes.data.token;
    } catch (e) {
        if (e.response && e.response.status === 409) {
            console.log('   User exists, logging in...');
            const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
                email: 'test_wl@example.com',
                password: 'password123'
            });
            token = loginRes.data.token;
        } else {
            throw e;
        }
    }
    console.log('   Got Token:', token ? 'Yes' : 'No');

    console.log('\n2. Testing GET /api/watchlist...');
    try {
        const res = await axios.get(`${BASE_URL}/watchlist`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Status:', res.status);
        console.log('   Data:', res.data);
    } catch (e) {
        console.error('   FAILED:', e.response ? e.response.status : e.message);
        if (e.response) console.error('   Data:', e.response.data);
    }

    console.log('\n3. Testing POST /api/watchlist/add...');
    try {
        const addRes = await axios.post(`${BASE_URL}/watchlist/add`, {
            movie_id: 12345,
            title: "Test Movie",
            poster_path: "/path.jpg"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Status:', addRes.status);
        console.log('   Message:', addRes.data.message);
    } catch (e) {
        console.error('   FAILED:', e.response ? e.response.status : e.message);
        if (e.response) console.error('   Data:', e.response.data);
    }

  } catch (err) {
    console.error('Global Error:', err.message);
    if (err.response) console.log(err.response.data);
  }
}

testWatchlist();
