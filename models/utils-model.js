const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Utils = new Schema(
    {
            maxSupply: {type: Number, required: false},
            circulatingSupply: {type: Number, required: false},
            indexPrice: {type: Number, required: false},
    })

module.exports = mongoose.model('utils', Utils)