const route = require('express').Router();
const cards = require('../controllers/cardController.js');

// unrestricted routes
route.get("/all", cards.getCards);
route.get("/:id", cards.getCard);

// restricted routes

module.exports = route;