const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    show:{
        type:Boolean,
        required:false
    },
    
});

module.exports = mongoose.model("Category", categorySchema);