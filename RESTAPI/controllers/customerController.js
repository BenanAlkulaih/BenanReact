const db = require('mongoose');
const Customer = require('../models/customer');

// unrestricted
exports.getCustomers = (req, res) => {
    Customer.find().then(data => res.status(200).json(data))
}

exports.getCustomerById = (req, res) => {   
    Customer.findOne({ _id: req.params.id }).then(data => res.status(200).json(data))
}

exports.createCustomer = (req, res) => {

    const customer = new Customer(
        {
            _id:        new db.Types.ObjectId,
            firstname:  req.body.firstname,
            lastname:   req.body.lastname,
            Name:   req.body.Name,
            address:    req.body.address,
            Zipcode:   req.body.Zipcode,
            City:   req.body.City,
            Email:   req.body.Email,
            Tele:   req.body.Tele
        }
    ) 

    customer.save()
    .then(() => {
        res.status(201).json({
            message: 'Kunden skapades',
            data: customer
            
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Kunden kunde inte skapades',
            error: error
        })
    })

}

exports.deleteCustomerById = (req, res) => {
    Customer.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'Kunden togs bort från databasen'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Kunden togs inte bort från databasen!',
            error: error
        })
    })
}