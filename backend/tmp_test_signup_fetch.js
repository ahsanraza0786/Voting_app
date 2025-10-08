(async () => {
  try {
    const res = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Fetch Test User',
        email: 'fetchtest@example.com',
        password: 'TestPass123',
        age: 29,
        address: '789 Fetch Ave',
        mobile: '9876543213',
        aadharCardNumber: '123412341237'
      })
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error('Error:', err);
  }
})();
