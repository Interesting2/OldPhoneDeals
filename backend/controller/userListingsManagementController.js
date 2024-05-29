const PhoneListing = require('../models/PhoneListing');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUserListings = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
        const user = await User.findOne({ email: decoded.userId });
        PhoneListing.find({ seller:  user._id})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log("error: "+ err)
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createListing = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
        const user = await User.findOne({ email: decoded.userId });
        const newListing = new PhoneListing({ ...req.body, seller: user._id });
        await newListing.save();
        res.json(newListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
        const user = await User.findOne({ email: decoded.userId });
        await PhoneListing.deleteOne({ _id: req.params.id, seller: user._id });
        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateListing = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
        const user = await User.findOne({ email: decoded.userId });
        const updatedListing = await PhoneListing.findOneAndUpdate({ _id: req.params.id, seller: user._id }, req.body, { new: true });
        res.json(updatedListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
