const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({ 
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    interfon:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lng:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },


});

module.exports = mongoose.model("Address", addressSchema);