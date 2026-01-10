const http = require('http');

function request(path, method, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data || '{}') }));
        });

        req.on('error', (e) => reject(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function test() {
    const timestamp = Date.now();
    const user = {
        username: `testuser_${timestamp}`,
        email: `test_${timestamp}@example.com`,
        password: 'password123'
    };

    console.log("1. Testing Registration...");
    try {
        const regRes = await request('/api/auth/register', 'POST', user);
        console.log(`Registration Status: ${regRes.status}`, regRes.body);

        if (regRes.status === 201) {
            console.log("2. Testing Login...");
            const loginRes = await request('/api/auth/login', 'POST', { email: user.email, password: user.password });
            console.log(`Login Status: ${loginRes.status}`, loginRes.body);
            
            if (loginRes.status === 200 && loginRes.body.token) {
                console.log("SUCCESS: Backend Auth works!");
            } else {
                console.log("FAIL: Login failed.");
            }
        } else {
            console.log("FAIL: Registration failed.");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();
