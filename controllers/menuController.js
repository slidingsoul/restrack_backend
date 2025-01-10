const { Menu } = require('../models');

const recommendMenu = async (req, res) => {
  const { menu_id } = req.params;

  try {
    
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

   
    menu.recommended = true;
    await menu.save();

    return res.status(200).json({
      message: 'Menu item recommended successfully.',
      menu,
    });
  } catch (error) {
    console.error('Error recommending menu item:', error);
    return res.status(500).json({ error: 'Failed to recommend menu item.' });
  }
};

const unrecommendMenu = async (req, res) => {
  const { menu_id } = req.params;

  try {

    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }


    menu.recommended = false;
    await menu.save();

    return res.status(200).json({
      message: 'Menu item unrecommended successfully.',
      menu,
    });
  } catch (error) {
    console.error('Error unrecommending menu item:', error);
    return res.status(500).json({ error: 'Failed to unrecommend menu item.' });
  }
};

const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    return res.status(200).json(menus);
  } catch (error) {
    console.error('Error retrieving menus:', error);
    return res.status(500).json({ error: 'Failed to retrieve menus.' });
  }
};

module.exports = { recommendMenu, unrecommendMenu, getAllMenus };