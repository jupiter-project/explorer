const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Block = new Schema(
    {
        previousBlockHash: { type: String, required: true },
        payloadLength: { type: String, required: true },
        totalAmountNQT: { type: String, required: true },
        amountNQT: { type: String, required: false },
        generationSignature: { type: String, required: true },
        generator: { type: String, required: true },
        generatorPublicKey: { type: String, required: true },
        baseTarget: { type: String, required: true },
        payloadHash: { type: String, required: true },
        generatorRS: { type: String, required: true },
        nextBlock: { type: String, required: false },
        requestProcessingTime: { type: Number, required: true },
        numberOfTransactions: { type: Number, required: true },
        blockSignature: { type: String, required: true },
        transactions: { type: [String], required: false },
        version: { type: Number, required: true },
        totalFeeNQT: { type: String, required: true },
        previousBlock: { type: String, required: false },
        cumulativeDifficulty: { type: String, required: true },
        block: { index: true, type: String, required: false, unique: true },
        height: { index: true, type: Number, required: true },
        timestamp: { type: Number, required: true },
    })

module.exports = mongoose.model('blocks', Block)
