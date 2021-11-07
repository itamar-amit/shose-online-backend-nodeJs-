const {categoryModel}=require ('../schema/categories.shcema')


async function categoryValidation (req , res , next){
    try {
        let categoryName = ['Sneakers' , 'Running' , 'Football' , 'Training']
        let validCategory = categoryName.find(element => element == req.body.name)
        if (validCategory == req.body.name) {
            next()
        } else {
            res.json({status: false , msg:"invalid name"})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "failed from the server"})
    }
}




async function addCategory (req , res ,next){
    try {
        let addCategory=new categoryModel(req.body)
        await addCategory.save()
        res.json({status: true , msg: "Success to create a new category" })

    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "failed from the server"})
    }
}



module.exports = { addCategory , categoryValidation }