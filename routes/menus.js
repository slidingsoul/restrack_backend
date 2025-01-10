const express = require('express');
const { recommendMenu, unrecommendMenu } = require('../controllers/menuController');
const { authenticateJWT } = require('../middleware/authenticateJWT.js'); 

const router = express.Router();


router.put('/:menu_id/recommend', authenticateJWT, recommendMenu);

router.put('/:menu_id/unrecommend', authenticateJWT, unrecommendMenu)

module.exports = router;