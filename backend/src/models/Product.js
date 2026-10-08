const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: mongoose.Schema.Types.ObjectId,
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
