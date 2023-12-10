const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

        cover:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true
        },
        id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        size:{
            type:Boolean,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        },
        uid:{
            type:String,
            required:true
        },
        variations:{
            type:Array,
            required:true
        }
    }
);

module.exports = mongoose.model("Food", foodSchema);