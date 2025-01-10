const { User } = require('../models');


const regulateTcoin = async (req, res) => {
  try {
    const { t_coin } = req.body; 
    const userId = req.user.user_id; 


    if (typeof t_coin !== 'number' || t_coin % 15000 !== 0) {
      return res.status(400).json({ 
        error: 't_coin must be a number and a multiple of 15000.' 
      });
    }

 
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

 
    user.t_coin = t_coin;
    await user.save();

    return res.status(200).json({
      message: 't_coin successfully updated.',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        t_coin: user.t_coin,
      },
    });
  } catch (error) {
    console.error('Error regulating t_coin:', error);
    return res.status(500).json({ error: 'Failed to update t_coin.' });
  }
};


const getUserDetails = async (req, res) => {
  const userId = req.user.user_id; 

  try {
    const user = await User.findByPk(userId, {
      attributes: ['name', 'email', 'telephone_number'], 
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        telephone_number: user.telephone_number,
      },
    });
  } catch (error) {
    console.error('Error retrieving user details:', error);
    return res.status(500).json({ error: 'Failed to retrieve user details.' });
  }
};

module.exports = { getUserDetails, regulateTcoin };