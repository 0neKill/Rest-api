const { Router } = require('express');
const router = Router();
const { authVerificate, startVerificate } = require('../../middleware');
const { dates } = require('../../controllers');

//USER DATE 
router.post('/userDate', authVerificate, dates.userData);
//GAME DATE (when user push button)
router.post('/gameDate', authVerificate, startVerificate, dates.gameDate);

module.exports = router;
