const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/reviews_db', {useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));

const reviewSchema = new Schema ({
  productId: Number,
  shopId: Number,
  type: String,
  avatar: String,
  reviewer: String,
  date: Date,
  star_rating: Number,
  text: String,
  imageURL: String,
  item: String,
  itemImageURL: [String]
}, { collection: 'reviews' });

const reviewModel = mongoose.model('Review', reviewSchema);

const getItemReviewsById = (id, callback) => {
  reviewModel.find({ productId: id, type: 'item' }, null, { sort: {date: -1} }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getShopReviewsById = (id, callback) => {
  reviewModel.find({ shopId: id, type: 'shop' }, null, { sort: {date: -1} }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

module.exports = {getShopReviewsById, getItemReviewsById}

