const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

const employeeSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },  
    address:{
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
    profilePicture:{
        type:String,
        required:true
    },
    employeeType:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    

});

module.exports = mongoose.model("Employee", employeeSchema); 