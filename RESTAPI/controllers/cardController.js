const db = require('mongoose');
const Card = require('../models/card');

//unrestricted
exports.getCards = (req, res) => {
    let _cards = [
        { 
            _id: 1, 
            title: 'Boxttitel 1', 
            text: 'Sit amet ipsum dolör sit amet, id mei eripuit scribentur. amet, id mei eripuit scribentur.', 
            footer: '1 dag sedan', 
            img: 'https://images.pexels.com/photos/2324272/pexels-photo-2324272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 
            alt: 'boxtitel 1' 
        },
        { _id: 2, title: 'Boxttitel 2', text: 'Lorem dolör sit amet ipsum dolör sit amet, id mei eripuit scribentur. amet, id mei eripuit scribentur.', footer: '2 dagar sedan', img: 'https://images.pexels.com/photos/2289138/pexels-photo-2289138.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 2' },
        { _id: 3, title: 'Boxttitel 3', text: 'Lorem dolör sit amet ipsum dolör , id mei eripuit scribentur. amet, id mei eripuit scribentur.', footer: '3 dagar sedan', img: 'https://images.pexels.com/photos/2291591/pexels-photo-2291591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 3' },
        { _id: 4, title: 'Boxttitel 4', text: 'Lorem dolör sit  dolör sit amet, id mei eripuit scribentur. amet, id mei eripuit scribentur.', footer: '4 dagar sedan', img: 'https://images.pexels.com/photos/2292833/pexels-photo-2292833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 4' },
        { _id: 5, title: 'Boxttitel 5', text: 'Dolör sit amet ipsum dolör sit amet, id mei eripuit scribentur. amet, id mei eripuit scribentur.', footer: '5 dagar sedan', img: 'https://images.pexels.com/photos/2292101/pexels-photo-2292101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 5' },
        { _id: 6, title: 'Boxttitel 6', text: 'Lorem dolör sit amet ipsum dolör sit  eripuit scribentur. amet, id mei eripuit scribentur.', footer: '6 dagar sedan', img: 'https://images.pexels.com/photos/2289430/pexels-photo-2289430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 6' }       
    ]

    return res.status(200).json(_cards);
}

exports.getCard = (req, res) => {
    let _card = { 
        _id: 1, title: 'Boxttitel 1', text: 'Sit amet ipsum dolör sit amet, id mei eripuit scribentur. amet, id mei eripuit scribentur.', footer: '1 dag sedan', img: 'https://images.pexels.com/photos/2324272/pexels-photo-2324272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', alt: 'boxtitel 1' 
    }

    return res.status(200).json(_card);    
}