const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 2021
const { connection } = require('./connectToDB')

connection()


app.use(express.json())

dotenv.config()

app.use('/users' , require('./route/users.route'))
app.use('/products', require('./route/products.route'))
app.use('/orders', require('./route/orders.route'))
app.use('/companies', require('./route/companies.route'))
app.use('/categories', require('./route/categoties.route'))

app.use((req , res)=>{ res.json("Page Not Found") })






app.listen(port , ()=>{
    console.log("server is running");
})