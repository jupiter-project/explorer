const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema(
    {
        unconfirmedBalanceNQT: { type: String, required: true },
        accountRS: { type: String, required: true },
        name: { type: String, required: false },
        description: { type: String, required: false },
        forgedBalanceNQT: { type: String, required: true },
        balanceNQT: { type: String, required: true },
        publicKey: { type: String, required: false },
        account: { type: String, required: true },
    })

module.exports = mongoose.model('accounts', Account)
