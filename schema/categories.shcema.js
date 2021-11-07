const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }
})

const categoryModel = mongoose.model("categories" , categorySchema)

module.exports = { categoryModel }



