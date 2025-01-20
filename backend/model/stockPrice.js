const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Price = new Schema({
    symbol: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    high: {
        type: String,
        required: true
    },
    low: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('price', Price)
