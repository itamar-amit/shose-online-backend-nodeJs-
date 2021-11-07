const express = require("express")
const route = express.Router()
const { companyValidation , addCompany } = require('../controllers/companies.controllers')
const { checkLevel } = require('../global.request')


route.post('/addCompany', checkLevel , companyValidation , addCompany)


module.exports=route