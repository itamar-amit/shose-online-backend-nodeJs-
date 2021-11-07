const {companyModel}=require ('../schema/companies.schema')


async function companyValidation (req , res , next) {
    if (req.level !== "admin") {
        res.json({status:false, msg: "No permission"})
        return
    } 
    try {
        const companyName = ['Nike' , 'Adidas' , 'Fila' , 'Vans']
        let validCompany = req.body.name
        for(let i = 0 ; i < companyName.length ; i++) {
            if (companyName[i] === validCompany) {
                next()
                return
            }}
        res.json({status: false , msg: "invalid name"})
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "failed from the server"})
    }
}

async function addCompany (req , res) {
    try {
        let addCompany= new companyModel(req.body)
        await addCompany.save()
        res.json({status: true , msg: "Success to create a new company" })
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "failed from the server"})
    }
}




module.exports = { companyValidation , addCompany }