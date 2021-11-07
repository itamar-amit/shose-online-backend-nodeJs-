const express = require("express")
const route = express.Router()
const { allProducts , addProValidation , addProducts , editPrValidation , editProduct } = require('../controllers/products.controllers')
const { checkLevel } = require('../global.request')


route.get('/allProducts' , allProducts)

route.post('/addProducts' , checkLevel , addProValidation , addProducts)

route.put('/editProduct' , checkLevel , editPrValidation , editProduct)


module.exports=route