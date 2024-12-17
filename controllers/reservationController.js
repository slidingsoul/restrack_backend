// controllers/reservationController.js

const { Reservation, Menus_Preorders, Menu } = require('../models'); // Adjust paths if necessary

async function createReservation(req, res) {
  const { date_time, table_id, menu_ids } = req.body;
  const user_id = req.user.user_id; // Get the user ID from the authenticated JWT token
  console.log(user_id)
  try {
    // Create a new reservation
    const reservation = await Reservation.create({
      date_time,
      table_id,   // Add table_id
      user_id,
      status: 'pending',  // Default status
      cancelled_by: null,
      deposited: false,  // Default deposited status
    });

    // Map the menu IDs to create preorders
    const menuPreorders = menu_ids.map(menu_id => ({
      reservation_id: reservation.reservation_id,
      menu_id: menu_id,
      quantity: 1,  // Default quantity (you can adjust it)
    }));

    // Insert the preorder records
    await Menus_Preorders.bulkCreate(menuPreorders);

    res.status(201).json({ message: 'Reservation created successfully!', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation.' });
  }
}

module.exports = { createReservation };
