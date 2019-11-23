
const express = require('express')

const BlockCtrl = require('../controllers/block-ctrl')

const router = express.Router()

router.post('/block', BlockCtrl.createBlock)
router.put('/block/:id', BlockCtrl.updateBlock)
router.get('/block/:id', BlockCtrl.getBlockId)
router.get('/blocks', BlockCtrl.getBlocks)

module.exports = router
