const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;