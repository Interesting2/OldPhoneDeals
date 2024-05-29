const PhoneListing = require('../models/PhoneListing');

const getBestSellers = async (req, res) => {
  PhoneListing.find({ reviews: { $exists: true, $not: { $size: 0 } }, $or: [{ disabled: false }, { disabled: { $exists: false } }]})
    .populate('reviews.reviewer', 'firstname lastname')
    .populate('seller', 'firstname lastname')
    .then(listings => {
      const listingsWithAvgRating = listings.map(listing => {
        const totalRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / listing.reviews.length;
        return {
          ...listing.toObject(),
          avgRating
        };
      });

      const bestSellersListings = listingsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating).slice(0, 5);
      console.log(bestSellersListings)
      res.json(bestSellersListings);
    })
    .catch(err => console.error(err));
}

const getSoldOutSoon = async (req, res) => {
  PhoneListing.find({ $or: [{ disabled: false }, { disabled: { $exists: false } }], stock: { $gt: 0 } })
    .populate('reviews.reviewer', 'firstname lastname')
    .populate('seller', 'firstname lastname')
    .sort({ stock: 1 })
    .limit(5)
    .then(listings => {
      // console.log(listings)
      res.json(listings)
    })
    .catch(err => console.error(err));
}

module.exports = { getBestSellers, getSoldOutSoon };