const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt'); 
const { User } = require('../models'); 
const router = express.Router();


router.post('/signup', async (req, res) => {
  const { name, email, telephone_number, password } = req.body;

  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }


    const newUser = await User.create({ name, email, telephone_number, password });


    const token = jwt.generateToken(newUser);


    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.generateToken(user);


    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
