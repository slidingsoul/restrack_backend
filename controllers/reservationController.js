// controllers/reservationController.js

const { Reservation, Menus_Preorders} = require('../models'); 

async function createReservation(req, res) {
  const { date_time, table_id, menu_ids } = req.body;
  const user_id = req.user.user_id;
  console.log(user_id)
  try {
    // Create a new reservation
    const reservation = await Reservation.create({
      date_time,
      table_id, 
      user_id,
      status: 'pending', 
      cancelled_by: null,
      deposited: false,  
    });


    const menuPreorders = menu_ids.map(menu_id => ({
      reservation_id: reservation.reservation_id,
      menu_id: menu_id,
      quantity: 1,  
    }));

    await Menus_Preorders.bulkCreate(menuPreorders);

    res.status(201).json({ message: 'Reservation created successfully!', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation.' });
  }
}

async function updateReservationStatus(req, res) {
  try {
    const { reservation_id } = req.params;
    const { status } = req.body; 
    const validStatuses = ['pending', 'cancelled', 'completed', 'inreview'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const reservation = await Reservation.findByPk(reservation_id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    reservation.status = status;
    await reservation.save();

    return res.status(200).json({
      message: 'Reservation status updated successfully.',
      reservation,
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return res.status(500).json({ error: 'Failed to update reservation status.' });
  }
};

const updateReservationDeposit = async (req, res) => {
  try {
    const { reservation_id } = req.params;
    const { deposited } = req.body;

    if (typeof deposited !== 'boolean') {
      return res.status(400).json({ error: 'Deposited value must be true or false.' });
    }

    const reservation = await Reservation.findByPk(reservation_id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }


    reservation.deposited = deposited;
    await reservation.save();

    return res.status(200).json({
      message: 'Reservation deposit value updated successfully.',
      reservation,
    });
  } catch (error) {
    console.error('Error updating reservation deposit value:', error);
    return res.status(500).json({ error: 'Failed to update reservation deposit value.' });
  }
};

const cancelReservationbyUser = async (req, res) => {
  const { reservation_id } = req.params;

  try {

    const reservation = await Reservation.findByPk(reservation_id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }


    reservation.status = 'cancelled';
    reservation.cancelled_by = 'user';
    await reservation.save();

    return res.status(200).json({
      message: 'Reservation cancelled by user successfully.',
      reservation,
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return res.status(500).json({ error: 'Failed to cancel reservation.' });
  }
};

const cancelReservationbyMod = async (req, res) => {
  const { reservation_id } = req.params;

  try {

    const reservation = await Reservation.findByPk(reservation_id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }


    reservation.status = 'cancelled';
    reservation.cancelled_by = 'moderator';
    await reservation.save();

    return res.status(200).json({
      message: 'Reservation cancelled by mod successfully.',
      reservation,
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return res.status(500).json({ error: 'Failed to cancel reservation.' });
  }
};

module.exports = { createReservation, updateReservationStatus, 
  updateReservationDeposit, cancelReservationbyUser, cancelReservationbyMod };
