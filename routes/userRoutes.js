const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const jwtkey = process.env.JWT_KEY;
const { default: mongoose } = require('mongoose');

const createUser = (req, res) => {
    const { email,role, password } = req.body;
    let data = req.body;
    User.exists({ email: data.email }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Result :", doc) // true
            if (doc === null) {
                bcrypt.hash(data.password, 10, async function (err, hash) {

                    const user = new User({
                        email: data.email,
                        role: data.role,
                        password: hash
                    })


                    user.save().then(createdUser => {

                        console.log(createdUser._id);
                        if (createdUser) {
                            res.status(201).json({
                                message: "User added successfully",
                                postId: createUser._id
                            });

                        } else {
                            res.status(500).json({
                                message: "Error saving user"
                            });
                        }

                    })

                })

            }else{
                res.status(200).json({
                    message: "User already exists"
                });
            }
        }
    });


}

const authenticate = (req, res) => {
    let data = req.body;
    User.findOne({ "email": data.email }).then(user => {
        if (user) {
            let passInTheDatabase = user.password;
            bcrypt.compare(data.password, passInTheDatabase, function (err, _res) {
                if (user) {
                    if (_res === false) {
                        res.status(401).json({
                            acceso: false,
                            mensaje: 'Usuario o contraseña incorrectos'
                        });
                    } else {
                        const payload = {
                            user: user
                        };

                        const token = jwt.sign(payload, jwtkey, {
                            expiresIn: 1440  //token expiration period
                        });
                        res.status(200).json({
                            acceso: true,
                            mensaje: 'Autenticación correcta',
                            token: token,
                            id: user._id,
                            role: user.role,
                            username: user.username
                        });


                    }
                } else {
                    res.status(401).json({
                        acceso: false,
                        mensaje: "Usuario o contraseña incorrectos"
                    });

                }

            })


        } else {
            console.log("user not found");
            res.json({
                status: 401,
                acceso: false,
                mensaje: "Usuario o contraseña incorrectos"
            });



        }

    }, (err, res) => {
        console.log(err);
        res.status(401).json({
            acceso: false,
            mensaje: "Usuario o contraseña incorrectos"
        });

    })
};

const getAll = (req, res) => {
    console.log(req.requestTime);
    User.find({}, { email: 1, role: 1 }).then(users => {
        res.status(200).json(users);
    });
};

const getUser = (req, res) => {
    console.log(req.params);
    //const _sku = req.params.id * 1;
    const _id = req.params.id;

    User.find({ _id: _id },{email:1,role:1}).then(users => {
        
        res.status(200).json({
            message: "User fetched successfully!",
            results: users
        });
    });
};


const updateUser = (req, res) => {

    let data = req.body;

    return User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                username: data.username,
                role: data.role,
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Rim updated successfully!" });
    })


}

const updateUserPassword = (req, res) => {

    let data = req.body;



    bcrypt.hash(data.password, 10, async function (err, hash) {

        return User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    password: data.hash
                }

            }
        ).then(result => {
            res.status(200).json({ message: "User password updated successfully!" });
        })

    })


}

const deleteUser = (req, res) => {

    console.log(req.params);
    //const _sku = req.params.id * 1;

    const _id = mongoose.Types.ObjectId(req.params.id);
    

    User.findByIdAndRemove(_id).then(brands => {
        res.status(200).json({
            message: "User deleted successfully!",
        });
    });
};


const router = express.Router();

router
    .route('/')
    .get(getAll)
    .post(createUser);

router.route('/authenticate').post(authenticate);
//to specify routes
router.route('/getAll').get(getAll); 

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .patch(updateUserPassword)
    .delete(deleteUser);

module.exports = router;