const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    address:{
        addressId:{
            type:String,
            required:true
        },
        address:{

        },
        lat:{
            type:Number,
            required:true
        },
        lng:{
            type:Number,
            required:true
        },
    },
    appliedCoupon:{
        type:String,
        required:true
    },
    driverId:{
        type:String,
        required:true
    },
    deliverFee:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },
    orderid:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paykey:{
        type:String,
        required:true
    },
    chopsticks:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    venueId:{
        type:String,
        required:true
    }

    
});

module.exports = mongoose.model("Orders", ordersSchema);