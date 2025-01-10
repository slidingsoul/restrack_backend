const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const authenticateToken = require('../middleware/auth'); 
const { regulateTcoin } = require('../controllers/userController'); 

const router = express.Router();


router.put('/me', authenticateToken, async (req, res) => {
  const { name, email, telephone_number, password } = req.body;
  const userId = req.user.user_id;  

  try {
    // Find the current user
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
    }


    let hashedPassword = user.password; 
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); 
    }


    const updatedUser = await user.update({
      name: name || user.name, 
      email: email || user.email,
      telephone_number: telephone_number || user.telephone_number,
      password: hashedPassword, 
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        telephone_number: updatedUser.telephone_number,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/tcoin', authenticateToken, regulateTcoin);


module.exports = router;
