const mongoose = require("mongoose");

const driverreviewsSchema = new mongoose.Schema({   

    date:{
        type:String,
        required:true
    },
    descriptions:{
        type:String,
        required:true
    },
    driverId:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    user:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("Driverreviews", driverreviewsSchema);