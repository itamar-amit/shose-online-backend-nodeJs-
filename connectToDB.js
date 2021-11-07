const mongoose = require('mongoose')

async function connection(){
    try {
        await mongoose.connect("mongodb://localhost/shoesStore" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("server secssesfuly connect to DB");
    } catch (error) {
        console.log(error);
    }
}


module.exports = { connection }