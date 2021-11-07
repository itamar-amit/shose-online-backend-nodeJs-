const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    price: {
        type: Number,
        required:true
    },
    img: {
        type: String,
        required:true
    }
})

const productModel = mongoose.model("products" , productSchema)

module.exports = { productModel }