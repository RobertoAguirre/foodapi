const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

const ownerSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },  
    phoneNumber:{
        type:String,
        required:true
    },
    phoneNumber2:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    restaurantName:{
        type:String,
        required:true
    },
    RFC:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    mainAddress:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    

});

module.exports = mongoose.model("Owner", ownerSchema);