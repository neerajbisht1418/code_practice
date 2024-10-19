const User = require('../models/userModel');

exports.registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered.');
  }

  const user = new User({ name, email, password });
  await user.save();
  const token = await user.generateAuthToken();

  return { user, token };
};

exports.loginUser = async (email, password) => {
  const user = await User.findByCredentials(email, password);
  const token = await user.generateAuthToken();

  return { user, token };
};
