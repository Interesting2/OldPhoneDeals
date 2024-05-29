const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PhoneListing = require('../models/PhoneListing');

const createComment = async (req, res) => {
  try {
    console.log(req.headers.authorization)
    console.log("ERRR")
    console.log(req.headers.authorization.split(' ')[1])
    console.log("HELLO")
    // const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    // const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    console.log(decoded)
    console.log(decoded.userId)
    const newReviewer = await User.findOne({ email: decoded.userId }).select('-password');
    
    const newReviewerId = newReviewer._id.toString();
    console.log(newReviewer);
    console.log(newReviewerId);

    const { comment, rating, itemId } = req.body;
    console.log("itemid")
    console.log(itemId)

    const reviewId = new mongoose.Types.ObjectId();

    const newReview = {
        reviewer: newReviewerId,
        rating: rating,
        comment: comment,
        hidden: false,
        _id: reviewId
    }
    console.log("new Review")
    console.log(newReview);

    const phoneListingId = new mongoose.Types.ObjectId(itemId);
    PhoneListing.updateOne(
        { _id: phoneListingId },
        { $push: { reviews: newReview } }
    )
    .then((result) => {
        console.log("HERE")
        console.log(result)
        if (result.nModified === 0) {
            console.log("Update failed");
            return res.status(404).json({ error: 'Phone listing not found or not updated' });
        }
        const addedReview = {
            reviewer: {
                _id: newReviewerId,
                firstname: newReviewer.firstname,
                lastname: newReviewer.lastname
            },
            rating: rating,
            comment: comment,
            hidden: false,
            _id: reviewId
        } 
        console.log(addedReview);
        res.json({ addedReview: addedReview, msg: "Created Comment successfully" });

    
    })
    .catch((error) => {
        // Handle error
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
    
  } catch (err) {
    console.log("FKK")
    res.status(500).json({ error: err.message });
  }
};

// exports.getProfile = async (req, res) => {
//     try {
//       const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
//       const user = await User.findOne({ email: decoded.userId }).select('-password');
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  
module.exports = { createComment };