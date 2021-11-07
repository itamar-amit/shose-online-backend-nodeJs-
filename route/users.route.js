const express = require("express")
const route = express.Router()
const {register , regValidation , login , loginValidation , putUserLevel , deleteUser , findAllUsers , findUser } = require('../controllers/users.controllers')
const { createToken , checkLevel} = require('../global.request')


route.post('/register' , regValidation , register)

route.post ('/login' , loginValidation , login , createToken)

route.put('/putUserLevel' , checkLevel , putUserLevel)

route.delete('/deleteUser' , checkLevel , deleteUser)

route.get('/findAllUsers' , findAllUsers)

route.get('/findUser/:byNum' , findUser)


module.exports=route