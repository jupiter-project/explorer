
const express = require('express')

const TxCtrl = require('../controllers/tx-ctrl')

const router = express.Router()

router.post('/tx', TxCtrl.createTx)
router.put('/tx/:id', TxCtrl.updateTx)
router.get('/tx/:id', TxCtrl.getTxId)
router.get('/txs', TxCtrl.getTxs)

module.exports = router
