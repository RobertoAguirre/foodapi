const express = require('express');
const Owner = require('../models/owner.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtkey = process.env.JWT_KEY;
const { default: mongoose } = require('mongoose');

const createOwner = (req, res) => { 
    const { fullname, address, phoneNumber, phoneNumber2, email, restaurantName, RFC, profilePicture, employeeType, password } = req.body;
    let data = req.body;

    try{
        Owner.exists({ email: data.email }, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Result :", doc) // true
                if (doc === null) {
                    bcrypt.hash(data.password, 10, async function (err, hash) { 

                        const owner = new Owner({
                            fullname: data.fullname,
                            phoneNumber: data.phoneNumber,
                            phoneNumber2: data.phoneNumber2,
                            email: data.email,
                            restaurantName: data.restaurantName,
                            RFC: data.RFC,
                            logo: data.logo ? data.logo:'',
                            mainAddress: data.mainAddress,
                            password: hash
                        })

                        owner.save().then(createdOwner => {
                                
                                console.log(createdOwner._id);
                                if (createdOwner) {
                                    res.status(201).json({
                                        message: "Owner added successfully",
                                        postId: createdOwner._id
                                    });
        
                                } else {
                                    res.status(500).json({
                                        message: "Error saving owner"
                                    });
                                }
        
                        })
                    })
                }else{
                        res.status(200).json({
                            message: "Owner already exists"
                        });
                    }
                }
        });
    }catch(err){
        console.log(err);
    }
}


const authenticate = (req, res) => {
    let data = req.body;
    Owner.findOne({ "email": data.email }).then(owner => { 
        if (owner) {
            let passInTheDatabase = owner.password;
            bcrypt.compare(data.password, passInTheDatabase, function (err, result) {
                if (result == true) {
                    console.log("passwords match");
                    const token = jwt.sign({ email: data.email }, jwtkey);
                    res.status(200).json({
                        message: "Authentication successful",
                        token: token,
                        owner: owner
                    });
                } else {
                    console.log("passwords don't match");
                    res.status(200).json({
                        message: "Authentication failed"
                    });
                }
            });
        } else {
            res.status(200).json({
                message: "Authentication failed"
            });
        }
     });
};

const getAll = async (req, res) => {
    console.log(req.requestTime);
    Owner.find().then(result=>{
        res.status(200).json({
            message: "Owners retrieved successfully",
            owners: result
        });
    })
};

const getOwner = async (req, res) => {
    console.log(req.requestTime);
    Owner.findById(req.params.id).then(result=>{
        res.status(200).json({
            message: "Owner retrieved successfully",
            owner: result
        });
    })
};

const updateOwner = async (req, res) => { 
    let data = req.body;
    return Owner.updateOne({ _id: req.params.id }, {
        $set: {
            fullname: data.fullname,
            phoneNumber: data.phoneNumber,
            phoneNumber2: data.phoneNumber2,
            email: data.email,
            restaurantName: data.restaurantName,
            RFC: data.RFC,
            logo: data.logo,
            mainAddress: data.mainAddress
        }
    }).then(result => {
        res.status(200).json({ message: "Owner updated successfully!" });
    });
}

const updateOwnerPassword = async (req, res) => {

    let data = req.body;
    bcrypt.hash(data.password, 10, async function (err, hash) {
        return Owner.updateOne({ _id: req.params.id }, {
            $set: {
                password: hash
            }
        }).then(result => {
            res.status(200).json({ message: "Owner updated successfully!" });
        });
    });


}

const deleteOwner = async (req, res) => {
    Owner.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ message: "Owner deleted successfully!" });
    });
};

const router = express.Router();

router.route('/')
    .get(getAll)
    .post(createOwner);

router.route('/authenticate').post(authenticate);

router.route('/getAll').get(getAll);

router.route('/:id')
    .get(getOwner)
    // .patch(updateOwner)
    // .patch(updateOwnerPassword)
    .delete(deleteOwner);

router.route('/:id/update')
    .patch(updateOwner);

router.route('/:id/updatePassword')
    .patch(updateOwnerPassword);

module.exports = router;
