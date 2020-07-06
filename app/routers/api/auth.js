const { Router } = require('express');
const router = Router();
const { auth } = require('../../controllers');
const verif = require('../../middleware')


//LOGIN
router.post('/login', auth.singIn);
//REGISTER
router.post('/register', auth.regIn);
//REFRESH-TOKEN
router.post('/refresh-token', verif.authVerificate, auth.refreshToken);

module.exports = router;