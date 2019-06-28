const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// unrestricted
exports.register = function(req, res) {   
    User
        .find({ email: req.body.email })
        .exec()
        .then(function(user) {
            if(user.length > 0) {
                return res.status(400).json({
                    message: `A user with email address ${req.body.email} already exists.`,
                    statuscode: 400
                })
            }
            else {
                encrypt.hash(req.body.password, 10, function(error, hash) {
                    if(error) {
                        return res.status(500).json({ 
                            error: error,
                            message: ` ${req.body.email}`
                        });
                    }
                    else {
                        
                        let user = new User(
                            {

                                _id:            new db.Types.ObjectId,
                                firstname:      req.body.firstname,
                                lastname:       req.body.lastname,
                                addressline:    req.body.addressline,
                                zipcode:        req.body.zipcode,
                                city:           req.body.city,
                                country:        req.body.country,
                                email:          req.body.email,
                                password:       hash

                            }
                        );

                        user
                            .save()
                            .then(function() {
                                res.status(201).json({
                                   message: `The user ${req.body.firstname} ${req.body.lastname} was created successfully.`,
                                   statuscode: 201,
                                   success: true 
                                })
                            })
                            .catch(function(error) {
                                res.status(500).json({
                                    message: `Failed to create user ${req.body.firstname} ${req.body.lastname}.`,
                                    statuscode: 500,
                                    success: false
                                })
                            })
                    }
                })
            }
        }) 
}

exports.login = function(req, res) {
    User
        .findOne({ email: req.body.email })
        .then(function(user) {
            if(user === null) {
                return res.status(401).json({
                    message: "Email address or password is incorrect",
                    statuscode: 401,
                    success: false
                })
            } 
            else {
                encrypt.compare(req.body.password, user.password, function(error, result) {
                    if(error) {
                        return res.status(401).json({
                            message: "Email address or password is incorrect",
                            statuscode: 401,
                            success: false
                        })
                    }

                    if(result) {
                        const token = jwt.sign(
                            { id: user._id, email: user.email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "1h" }
                        )
                        
                        return res.status(200).json({
                            message: "Authentication was successful",
                            success: true,
                            statuscode: 200,
                            token: token,
                            id: user._id,
                            email: user.email,
                            currentUser: {
                                            _id:            user._id,
                                            firstname:      user.firstname,
                                            lastname:       user.lastname,
                                            addressline:    user.addressline,
                                            zipcode:        user.zipcode,
                                            city:           user.city,
                                            country:        user.country,
                                            email:          user.email
                                        }
                        })
                    }

                    return res.status(401).json({
                        message: "Email address or password is incorrect",
                        statuscode: 401,
                        success: false
                    })
                })
            }       
        })
}


// restricted

// exempel. localhost:3001/api/users/all
exports.getUsers = function(req, res) {

    User.find()              
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json(error))    
        
}

// exempel. localhost:3001/api/users/5ce515ce2af81f1484a0d88b
exports.getUser = function(req, res) {

    User.findOne({ _id: req.params.id }) 
    .then((user) => {
        res.status(200).json({
            message: "Användaren i databasen",
            success: true,
            currentUser: {
                            _id:            user._id,
                            firstname:      user.firstname,
                            lastname:       user.lastname,
                            addressline:    user.addressline,
                            zipcode:        user.zipcode,
                            city:           user.city,
                            country:        user.country,
                            email:          user.email
                        }
        })
    })            
    .catch((error) => res.status(500).json(error))

}

exports.updateUser = function(req, res) {

    User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
   
        User.findOne({ _id: req.params.id }) 
        .then((user) => res.status(200).json({
                message: "Användaren uppdateras i databasen",
                success: true,
                currentUser: {
                                _id:            user._id,
                                firstname:      user.firstname,
                                lastname:       user.lastname,
                                addressline:    user.addressline,
                                zipcode:        user.zipcode,
                                city:           user.city,
                                country:        user.country,
                                email:          user.email
                            } 
            }) 
        )
        .catch((error) => res.status(500).json(error))
    })

    .catch((error) => {
        res.status(500).json({
            message: 'Användaren uppdaterades inte i databasen!',
            error: error
        })
    })  
}

exports.deleteUser = function(req, res) {
    User.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'Användaren togs bort från databasen'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Användaren togs inte bort från databasen!',
            error: error
        })
    })    
}