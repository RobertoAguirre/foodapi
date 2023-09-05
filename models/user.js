const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required: [true,'A user must have a username'] 
    },
    role:{
        type:String,
        required: [true,'A user must have a role'] 
    },
    password:{
        type:String,
        required: [true,'A user must have password'] 
    }

});

module.exports = mongoose.model('User',userSchema);