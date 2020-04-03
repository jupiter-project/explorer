const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tx = new Schema(
    {
        signature: { type: String, required: true },
        transactionIndex: { type: Number, required: false },
        type: { type: Number, required: true },
        phased: { type: String, required: true },
        ecBlockId: { type: String, required: true },
        signatureHash: { type: String, required: true },
        attachment: {
                      messageIsText: { type: String, required: false },
                      messageHash: { type: String, required: false },
                      message: { type: String, required: false },
                    },
        senderRS: { type: String, required: true },
        subtype: { type: Number, required: true },
        amountNQT: { type: String, required: false },
        recipientRS: { type: String, required: false },
        blockTimestamp: { type: Number, required: false },
        deadline: { type: String, required: false },
        version: { type: Number, required: true },
        feeNQT: { type: String, required: true },
        senderPublicKey: { type: String, required: true },
        requestProcessingTime: { type: Number, required: true },
        confirmations: { type: Number, required: false },
        fullHash: { type: String, required: true },
        sender: { type: String, required: true },
        recipient: { type: String, required: false },
        ecBlockHeight: { type: Number, required: true },
        transaction: { index: true, type: String, required: false, unique: true },
        block: { index: true, type: String, required: false },
        height: { index: true, type: Number, required: true },
        timestamp: { type: Number, required: true },
    })

module.exports = mongoose.model('txs', Tx)
