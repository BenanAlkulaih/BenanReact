const db = require('mongoose');

const caseSchema = db.Schema({

    _id:            db.Schema.Types.ObjectId,
    customer:          { type: String, required: true },
    skapadBy:           { type: String, required: true },
    subject:         { type: String, required: true },
    body:            { type: String, required: true },
    status:            { type: String },

    created:        { type: Date, default: Date.now },
    modified:       { type: Date, default: Date.now }
    
});

module.exports = db.model("Case", caseSchema);