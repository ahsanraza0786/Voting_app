const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'TestPass123',
  age: 25,
  address: '123 Test St',
  mobile: '9876543210',
  aadharCardNumber: '123412341234'
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/user/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  console.log('Status:', res.statusCode);
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try{
      console.log('Response:', JSON.parse(body));
    }catch(e){
      console.log('Response (raw):', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(data);
req.end();
