const {signup} = require("../controllers/authController");
const User = require('../models/User');
const bcrypt = require('bcryptjs');

jest.mock("../models/User");
jest.mock("bcryptjs");

test('signup fails if email already exists', async () => {
  User.findOne.mockResolvedValue({ email: 'existing@test.com' });

  const req = { body: { name: 'Test', email: 'existing@test.com', password: '123456' } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await signup(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: "Email already registered" });
});