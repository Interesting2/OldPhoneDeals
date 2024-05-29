const mongoose = require('mongoose');

const PhoneListing = require('../models/PhoneListing');

const getSearchResults = async (req, res) => {
    console.log("GETTING SEARCH RESULTS");
    
    const { searchTerm } = req.query;
    PhoneListing.find({ title: { $regex: searchTerm, $options: 'i' }, $or: [{ disabled: false }, { disabled: { $exists: false } }]})
    .populate('reviews.reviewer', 'firstname lastname')
    .populate('seller', 'firstname lastname')
    .then(listings => {

        console.log(listings)
        console.log(listings.length)
        res.json(listings)

    })
    .catch(err => console.error(err));

}

module.exports = { getSearchResults };