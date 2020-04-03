const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema(
    {
        unconfirmedBalanceNQT: { type: String, required: true },
        accountRS: { index: true, type: String, required: true, unique: true },
        name: { type: String, required: false },
        description: { type: String, required: false },
        forgedBalanceNQT: { type: String, required: false },
        balanceNQT: { type: String, required: false },
        publicKey: { type: String, required: false },
        account: { index: true, type: String, required: true, unique: true },
    })

module.exports = mongoose.model('accounts', Account)
