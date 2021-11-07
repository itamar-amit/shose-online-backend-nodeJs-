const { orderModel } = require('../schema/orders.schema')
const { productModel } = require('../schema/products.schema')


// get to run with the load the page of client

async function checkStatus (req , res) {
    try {
        let check = await orderModel.find({userName:req.params.userId , cartStatus:true})
        if (check.length > 0) {
            res.json({status: true , msg: "You have an open cart" , data:check})
        } else {
            let createCart = new orderModel({userName:req.params.userId})
            await createCart.save()
            res.json({status: true , msg: "Success to create a new cart" , data:createCart})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "failed from the server"})
    }
}


// post to add a new item to cart (with check if you have a open cart)

async function addItemsValidation(req , res ,next){
    try {
        let valid = await productModel.findById({_id:req.body.productId}).select("price")
        console.log(valid)
        let productsPrice = valid.price * req.body.amount
        req.totalPriceProduct = productsPrice
        next()
    } catch (error) {
        console.log(error)
        res.json({status:false , msg: "failed from server1"})
    }
}

async function addItem(req , res){
    try {
        let openCart = await orderModel.findById({_id:req.body.cartId})
        openCart.productsOrder.push({product:req.body.productId ,
        amount: req.body.amount, totalPriceProduct:req.totalPriceProduct})
        openCart.total = openCart.total + req.totalPriceProduct
        let newUpdateCart = await openCart.save()
        res.json({status: true , msg: "Item added to the cart" , data:newUpdateCart})
    } catch (error) {
        console.log(error)
        res.json({status:false , msg: "failed from server2"})
    }
}


// delete item from cart and calaculate the final total

async function deleteItem (req , res) {
    try {
        let cart = await orderModel.findById({_id:req.body.cartId})
        let item = []
        if (cart.productsOrder.length > 0) {
            for(let i = 0 ; i < cart.productsOrder.length; i++){
                if (cart.productsOrder[i]._id != req.body.deleteItem) {
                    item.push(cart.productsOrder[i])
                } else {
                    cart.total = cart.total - cart.productsOrder[i].totalPriceProduct
                }
            }
            cart.productsOrder = []
            for (let i = 0 ; i < item.length ; i++) {
                cart.productsOrder.push(item[i])
            }
            await cart.save()
            res.json({status: true , msg: "item deleted successfuly"})
        } else {
            res.json({status: false , msg: "no product"})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg:"user not deleted from the system"})
    }
}


// delete all item from cart and calaulate the finl total

async function deleteAllItems (req , res) {
    try {
        let cart = await orderModel.findById({_id:req.body.cartId})
        if (cart.productsOrder.length > 0) {
            cart.productsOrder = []
            cart.total = 0
            await cart.save()
            res.json({status: true , msg: "your items have been deleted"})
        } else {
            res.json({status: false , msg: "your cart is empty"})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg:"error from the server"})
    }
}


module.exports = { checkStatus , addItemsValidation , addItem , deleteItem , deleteAllItems }