const https = require('https');

const API_KEY = "c35323a6faf095bb12979fa6cf00e085";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ statusCode: res.statusCode, data: parsed });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function testApi() {
    console.log("Testing API...");
    try {
        const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;
        const result = await fetchUrl(url);
        
        console.log("Status Code:", result.statusCode);
        if (result.statusCode === 200) {
            console.log("Success! Data received.");
            if (result.data.results && result.data.results.length > 0) {
                console.log("First movie:", result.data.results[0].title);
            } else {
                console.log("No results found.");
            }
        } else {
            console.log("Error response:", result.data);
        }
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}

testApi();
