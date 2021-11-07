const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }
})

const companyModel = mongoose.model("companies" , companySchema)

module.exports = { companyModel }


