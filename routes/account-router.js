
const express = require('express')

const AccountCtrl = require('../controllers/account-ctrl')

const router = express.Router()

router.post('/account', AccountCtrl.recordAccount)
router.put('/account/:id', AccountCtrl.updateAccount)
router.get('/account/:id', AccountCtrl.getAccount)
router.get('/accounts/:id', AccountCtrl.getAccountTxs)

module.exports = router
