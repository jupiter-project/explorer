
const express = require('express')

const GeneratorsCtrl = require('../controllers/generator-ctrl')

const router = express.Router()

router.post('/generator', GeneratorsCtrl.recordGenerator)
router.get('/generators', GeneratorsCtrl.getGenerators)

module.exports = router
