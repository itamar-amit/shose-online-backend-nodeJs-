const { productModel } = require('../schema/products.schema')


// get all products

async function allProducts (req , res) {
    try {
        let allProducts = await productModel.find()
        res.json({status: true , msg: "success to found all products" , data:allProducts})
    } catch (error) {
        console.log(error)
        res.json({status:false , msg: "failed from server1"})
    }
}


// add products and use only by admin 

async function addProValidation (req , res , next) {
    if (req.level !== "admin") {
        res.json({status:false, msg: "No permission"})
        return
    } 
    try {
        let valid = req.body
        if (valid.name.length >= 2 && valid.company.length > 0 && valid.category.length > 0 && valid.price > 0 && valid.img.length > 0) {
            next()
        } else {
            res.json({status: false , msg: "Your parameters is incorrect"})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "error from server"})
    }
}

async function addProducts(req , res) {
    try {
        let addPro = new productModel(req.body)
        await addPro.save()
        res.json({status: true , msg: "Success to added your product"})
    } catch (error) {
        console.log(error);
        res.json({status:false , msg:"Failed to added your product"})
    }
}


// put product only by admin

async function editPrValidation (req , res , next) {
    if (req.level !== "admin") {
        res.json({status:false, msg: "No permission"})
        return
    } else {
        next()
    }
}

async function editProduct (req , res) {
    try {
        let findProduct = await productModel.findByIdAndUpdate({_id:req.body.id},{price:req.body.price},{name:req.body.name})
        res.json({status: true, msg: "The product is update"})
    } catch (error) {
        console.log(error);
        res.json({status: failed, msg:"Failed to product update" , data:findProduct})
    }
}


module.exports = { allProducts , addProValidation , addProducts , editPrValidation , editProduct }