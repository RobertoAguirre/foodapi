const mongoose = require("mongoose");

const chats = new mongoose.Schema({ 
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date.now(),
        required:true
    },

});

module.exports = mongoose.model("Chats", chats);