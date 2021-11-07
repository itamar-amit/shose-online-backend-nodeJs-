const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    dateOrder: {
        type: Date,
        default: Date.now
    },
    productsOrder: {
        type: [{
            product:{type: mongoose.Schema.Types.ObjectId, ref:'products'},
            amount: {type: Number, required: true},
            totalPriceProduct:{type: Number, required: true}
        }],
    },
    total: {
        type: Number,
        default: 0,
    },
    cartStatus: {
        type: Boolean,
        default: true
    }

})

const orderModel = mongoose.model("orders" , orderSchema)

module.exports = { orderModel }