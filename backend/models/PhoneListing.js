const mongoose = require('mongoose');

const phoneListingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      enum: ['Samsung', 'Apple', 'HTC', 'Huawei', 'Nokia', 'LG', 'Motorola', 'Sony', 'BlackBerry'],
      required: true
    },
    image: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    seller: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: 'User',
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    reviews: [{
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        required: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    }]
  });

const PhoneListing = mongoose.model('PhoneListing', phoneListingSchema, 'PhoneListings');

module.exports = PhoneListing