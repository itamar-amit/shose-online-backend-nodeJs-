const express = require("express")
const route = express.Router()
const { addCategory , categoryValidation } = require('../controllers/categories.controllers')


route.post('/addCategory' , categoryValidation , addCategory)


module.exports=route