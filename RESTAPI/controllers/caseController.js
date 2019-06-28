const db = require('mongoose');
const Case = require('../models/case');
//const Customer = require('../models/Customer');

// unrestricted
exports.getCases = (req, res) => {
    Case.find().then(data => res.status(200).json(data))
}

exports.getCaseById = (req, res) => {   
    Case.findOne({ _id: req.params.id }).then(data => res.status(200).json(data))
}

exports.createCase = (req, res) => {
   const casea = new Case(
        {
            _id:        new db.Types.ObjectId,
            customer:  req.body.customer,
            skapadBy:   req.body.createdBy,
            subject:   req.body.subject,
            body:    req.body.body,
            status:   1         
        }
    ) 

    casea.save()
    .then(() => {
        res.status(201).json({
            message: 'Ärende skapades',
            data: casea
            
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Ärende kunde inte skapades',
            error: error
        })
    })

}

