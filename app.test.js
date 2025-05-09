// app.test.js
const request = require('supertest');
const app = require('./app');

describe('Employee API', () => {
  test('GET / should return "Hello employees!"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello employees!");
  });

  test('GET /employees should return an array of employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /employees/:id should return the correct employee', async () => {
    const res = await request(app).get('/employees/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /employees/:id should return 404 for non-existing id', async () => {
    const res = await request(app).get('/employees/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Employee not found');
  });

  test('GET /employees/random should return one employee object', async () => {
    const res = await request(app).get('/employees/random');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('position');
  });
});
