const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema(
    {
        unconfirmedBalanceNQT: { type: String, required: true },
        accountRS: { type: String, required: true },
        name: { type: String, required: false },
        description: { type: String, required: false },
        forgedBalanceNQT: { type: String, required: false },
        balanceNQT: { type: String, required: false },
        publicKey: { type: String, required: false },
        account: { type: String, required: false },
    })

module.exports = mongoose.model('accounts', Account)
