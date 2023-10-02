const express = require("express");
const Employee = require("../models/employee");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtkey = process.env.JWT_KEY;
const { default: mongoose } = require('mongoose');


// Require the db.js file to connect to the database
require("../db");


const createEmployee = async (req, res) => {
    const { fullname, address, phoneNumber, phoneNumber2, email, restaurantName, RFC, profilePicture, employeeType, password } = req.body;
    let data = req.body;

    try{
        Employee.exists({ email: data.email }, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Result :", doc) // true
                if (doc === null) {
                    bcrypt.hash(data.password, 10, async function (err, hash) {
    
                        const employee = new Employee({
                            fullname: data.fullname,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            phoneNumber2: data.phoneNumber2,
                            email: data.email,
                            restaurantName: data.restaurantName,
                            RFC: data.RFC,
                            profilePicture: data.profilePicture,
                            employeeType: data.employeeType,
                            password: hash
                        })
    
                        employee.save().then(createdEmployee => {
                                
                                console.log(createdEmployee._id);
                                if (createdEmployee) {
                                    res.status(201).json({
                                        message: "Employee added successfully",
                                        postId: createdEmployee._id
                                    });
        
                                } else {
                                    res.status(500).json({
                                        message: "Error saving employee"
                                    });
                                }
        
                        })
                    })
                }else{
                    res.status(200).json({
                        message: "Employee already exists"
                    });
                }
    
            }
    
        });
    }catch(err){
        res.status(500).json({
            message: "Error saving employee"
        });
    }

   
}


const authenticate = (req, res) => {    
        let data = req.body;

        Employee.findOne({ "email": data.email }).then(employee => {

            if(employee){
                let passInTheDatabase = employee.password;
                bcrypt.compare(data.password, passInTheDatabase, function (err, _res) {
                    if(employee){
                        if(_res === false){
                            res.status(401).json({
                                acceso: false,
                                message: "Invalid credentials"
                            });
                        }else{
                            const payload = {
                                employee:  employee
                            };

                            const token = jwt.sign(payload, jwtkey, {
                                expiresIn: 1440  //token expiration period
                            });

                            res.status(200).json({
                                acceso: true,
                                message: "Access granted",
                                token:token,
                                id:employee._id,
                                employeeType:employee.employeeType,
                                employeeName:employee.fullname

                            });
                        }
                    }else{
                        res.status(401).json({
                            acceso: false,
                            message: "Invalid credentials"
                        });
                    }
                })
            }else{
                res.status(401).json({
                    acceso: false,
                    message: "Invalid credentials"
                });
            }


        });
    }
    const getAll = async (req, res) => {
        console.log(req.requestTime);
        Employee.find().then(result => {
            res.status(200).json({
                employees: result
            });
        });
    };

    const getEmployee = async (req, res) => {
        const id = req.params.id;
        Employee.findById(id).then(result => {
            res.status(200).json({
                employee: result
            });
        });
    };

    const updateEmployee = async (req, res) => {
        let data = req.body;

            return Employee.updateOne({ _id: req.params.id }, {
                $set: {
                    fullname: data.fullname,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    phoneNumber2: data.phoneNumber2,
                    email: data.email,
                    restaurantName: data.restaurantName,
                    RFC: data.RFC,
                    profilePicture: data.profilePicture,
                    employeeType: data.employeeType,
                }
            }).then(result => {
                res.status(200).json({
                    message: "Employee updated successfully"
                });
            });
        }
    
const updateEmployeePassword =(req,res)=>{
    let data = req.body;

    bcrypt.hash(data.password, 10, async function (err, hash) {
        return Employee.updateOne({ _id: req.params.id }, {
            $set: {
                password: hash
            }
        }).then(result => {
            res.status(200).json({
                message: "Employee updated successfully"
            });
        });
    });

}

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndRemove(id).then(result => {
        res.status(200).json({
            message: "Employee deleted successfully"
        });
    });
};

const router = express.Router();

router.route('/')
      .get(getAll)
      .post(createEmployee);  

router.route('/authenticate').post(authenticate);

router.route('/getAll').get(getAll);

router
    .route('/:id')
    .get(getEmployee)
    // .patch(updateEmployee)
    // .patch(updateEmployeePassword)
    .delete(deleteEmployee);

router.route('/:id/update')
    .patch(updateEmployee);

    router.route('/:id/updatePassword')
    .patch(updateEmployeePassword);

module.exports = router;





