
const express = require('express')

const PeerCtrl = require('../controllers/peers-ctrl')

const router = express.Router()

router.post('/peer', PeerCtrl.recordPeer)
router.get('/peers', PeerCtrl.getPeers)

module.exports = router
