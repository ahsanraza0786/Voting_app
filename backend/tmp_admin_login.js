// Temporary script to test admin login
// Usage: node backend/tmp_admin_login.js

(async () => {
  try {
    const resp = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aadharCardNumber: '333322221111', password: 'Admin@123' })
    });

    const text = await resp.text();
    console.log('Status:', resp.status);
    try {
      const json = JSON.parse(text);
      console.log('Response JSON:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Response text:', text);
    }
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(1);
  }
})();
