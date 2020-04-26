
const express = require('express')

const UtilsCtrl = require('../controllers/utils-ctrl')

const router = express.Router()

router.get('/utils/maxsupply', UtilsCtrl.getMaxSupply)
router.get('/utils/supply', UtilsCtrl.getSupply)
router.get('/utils/indexprice', UtilsCtrl.getIndexPrice)
router.post('/utils/savemaxsupply', UtilsCtrl.saveMaxSupply)
router.get('/utils/circulatingsupply', UtilsCtrl.getCirculatingSupply)

module.exports = router