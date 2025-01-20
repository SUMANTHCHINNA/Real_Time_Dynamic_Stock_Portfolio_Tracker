const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Stock = new Schema({
    stockName: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    quantity: {

        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timeseries: true })

module.exports = mongoose.model('stock', Stock)