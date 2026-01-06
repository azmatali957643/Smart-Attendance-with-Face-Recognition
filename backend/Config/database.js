const  mongoose=require("mongoose");
require("dotenv").config();

exports.connectWithDatabase=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(
        ()=>console.log("database connected")
    ).catch(
        (error)=>{
            console.log("database not connected");
            console.log(error);
            process.exit(1);
        }
    )
}