const jwt = require('jsonwebtoken')

// const crypto = require('crypto')


async function createToken(req , res){
    try {
        console.log(req.login)
        req.login.password = "******"
        let token = jwt.sign(
            {...req.login._doc},
            process.env.KEY ,
            {expiresIn: '60m'})
        res.json({status:true , msg:"token created" , data:token})
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "some error"})
    }
}


async function checkLevel (req , res , next){
    try {
        jwt.verify(req.headers.authorization, process.env.KEY,
            (error , payload)=>{
                if (error) {
                    res.json({status:false, msg: "your token is incorrect"})
                } else {
                    req.level = payload.level
                    console.log(req.level)
                    next()
                }})
    } catch (error) {
        console.log(error)
        res.json({status:false, msg: "failed from server"})
    }
}


module.exports= { createToken , checkLevel }