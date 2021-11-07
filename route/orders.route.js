const express = require("express")
const route = express.Router()
const { checkStatus , addItemsValidation , addItem , deleteItem , deleteAllItems } = require('../controllers/orders.controllers')


route.get('/checkStatus/:userId' , checkStatus)

route.post('/addItem' , addItemsValidation , addItem)

route.delete('/deleteItem' , deleteItem)

route.delete('/deleteAllItems' , deleteAllItems)
 

module.exports=route