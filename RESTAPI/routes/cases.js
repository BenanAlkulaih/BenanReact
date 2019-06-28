const route = require('express').Router();
const cases = require('../controllers/caseController.js');
const authorization = require('../auth/auth.js');
// unrestricted routes
route.get("/all", authorization, cases.getCases);
route.get("/:id", authorization, cases.getCaseById);
route.post('/', authorization, cases.createCase);

// restricted routes

module.exports = route;