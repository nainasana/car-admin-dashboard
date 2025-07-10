const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Database seeded successfully!');
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.error('Error seeding database:', err.message);
});

req.end(); 