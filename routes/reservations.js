const express = require('express');
const { Reservation } = require('../models'); 
const { authenticateJWT } = require('../middleware/authenticateJWT.js'); 
const { createReservation, updateReservationStatus, updateReservationDeposit, cancelReservationbyUser, cancelReservationbyMod } = require('../controllers/reservationController');


const router = express.Router();


router.get('/my-reservations', authenticateJWT, async (req, res) => {
  try {

    const userId = req.user.user_id;  


    const reservations = await Reservation.findAll({
      where: {
        user_id: userId,  
      },
    });


    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found.' });
    }


    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reservations' });
  }
});

router.post('/create-new-reservation', authenticateJWT, createReservation)

router.put('/:reservation_id/status', authenticateJWT, updateReservationStatus);

router.put('/:reservation_id/deposit', authenticateJWT, updateReservationDeposit);

router.put('/:reservation_id/cancel-by-user', authenticateJWT, cancelReservationbyUser);

router.put('/:reservation_id/cancel-by-mod', authenticateJWT, cancelReservationbyMod);


module.exports = router;
