const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Generators = new Schema(
    {
        generators: [{
            accountRS: { type: String, required: true },
            effectiveBalanceNXT: { type: String, required: false },
            deadline: { type: Number, required: false },
            account: { type: String, required: true },
            hitTime: { type: Number, required: true },
        }]
    })

module.exports = mongoose.model('generators', Generators)