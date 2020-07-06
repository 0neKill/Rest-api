const { Router } = require('express');
const router = Router();
const { authVerificate } = require('../../middleware')
const Clients = require('../../models/clients');
const path = require('path');
router.post('/c', authVerificate, async (req, res) => {
    const client = new Clients({
        title: req.body.title,
        version: req.body.version,
        discription: req.body.discription
    });
    try {
        await client.save();
        return res.status(200).json({ message: 'User created!' })
    } catch (err) { return res.status(500).json({ error: err.message }) }
});

router.get('/h', (req, res) => {
    res.download(path.join(__dirname, '..', '..', '..', 'public', '1.rar'))
})

module.exports = router;