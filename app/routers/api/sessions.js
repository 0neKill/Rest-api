const { Router } = require('express');
const router = Router();
const { joinClient, joinedServer } = require("../../controllers").session;

//CLIENT
router.post('/session/minecraft/join', joinClient);
//SERVER
router.get('/session/minecraft/hasJoined', joinedServer);

module.exports = router;