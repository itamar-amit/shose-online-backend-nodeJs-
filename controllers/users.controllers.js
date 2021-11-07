const { userModel } = require('../schema/users.schema')

//register
// all the users can be use in this request.


async function regValidation (req , res , next) {
    try {
        let validUser = req.body
        if (validUser.userName.length >= 2 && validUser.email.length > 10 && validUser.email.includes("@") && validUser.phone > 10 && validUser.password.length > 6 ) {
            let temp = await userModel.find()
            console.log(temp)
            for (let i = 0; i < temp.length ; i++) {
                if (temp[i].email == req.body.email) {
                    res.json({status:false , msg: "email exist"})
                    return
                }
            }
            next()
        } else {
            res.json({status: false , msg:"Try register agin through the rule" , data:validUser})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "some error from server"})
    }
}

async function register (req , res) {
    try {
        let registerUser = new userModel(req.body)
        // registerUser.password = crypto.createHash("sha256").update("xxx" + registerUser.password).digest("hex")
        // console.log(registerUser)
        await registerUser.save()
        res.json({status: true , msg:"user added is success"})
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "user added is failed"})
    }
}


//login

async function loginValidation (req , res , next) {
    try {
        let validUser = req.body
        if (validUser.email.length > 10 && validUser.email.includes("@") && validUser.password.length > 6) {
            next()
        } else {
            res.json({status: false , msg: "user or password is incorrect"})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "some error"})
    }
}

async function login (req , res , next) {
    try {
        let findUser = await userModel.find({email:req.body.email})
        if (findUser.length == 0) {
            res.json({status: false , msg: "user or password is incorrect"})
        } else {
            if (findUser[0].password === req.body.password) {
                req.login = findUser[0]
                next()
            } else {
                res.json({status: false , msg: "user or password is incorrect"})
            }
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg: "some error"})
    }
}


// Put user leve , only use by admin

async function putUserLevel (req , res) {
    if (req.level !== "admin") {
        res.json({status:false, msg: "No permission"})
        return
    } 
    try {
        let findUser = await userModel.findByIdAndUpdate({_id:req.body.id} , {level:req.body.level})
        res.json({status: true, msg: "The level is update success"})
    } catch (error) {
        console.log(error);
        res.json({status: failed, msg:"Failed to update level"})
    }
}

// Delete user , only use by admin

async function deleteUser (req , res) {
    if (req.level !== "admin") {
        res.json({status:false, msg: "No permission"})
        return
    } 
    try {
        await userModel.findByIdAndDelete({_id:req.body.id})
        res.json({status: true , msg: "user deleted successfully"})
    } catch (error) {
        console.log(error)
        res.json({status: false , msg:"user not deleted from the system"})
    }
}

//get all users and send to the client only userName and email address through the "select function"

async function findAllUsers (req , res){
    try {
        let allUsers = await userModel.find().select("userName email")
        res.json({status: true , msg: "success to find all users" , data: allUsers})
    } catch (error) {
        console.log(error)
        res.json({status: false , msg:"users not found"})
    }
}

// get specific user by phone number

async function findUser (req , res) {
    try {
        let user = await userModel.find({phone:req.params.byNum})
        if (user.length == 0) {
            res.json({status:true , msg:"user not found"})
        } else {
            res.json({status: true , msg: "success to find user" , data: user})
        }
    } catch (error) {
        console.log(error)
        res.json({status: false , msg:"users not found"})
    }
}


module.exports = { regValidation , register , loginValidation , login , putUserLevel , deleteUser , findAllUsers , findUser }