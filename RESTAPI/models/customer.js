const db = require('mongoose');

const customerSchema = db.Schema({

    _id:            db.Schema.Types.ObjectId,
    firstname:      { type: String, required: true },
    lastname:       { type: String, required: true },
    Name:           { type: String },
    address:        { type: String, required: true },
    Zipcode:       { type: String, required: true },
    City:       { type: String, required: true },
    Email:       { type: String, required: true },
    Tele:       { type: String, required: true },
    
    created:        { type: Date, default: Date.now },
    modified:       { type: Date, default: Date.now }
    
});

module.exports = db.model("Customer", customerSchema);
