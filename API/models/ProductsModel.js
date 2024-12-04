import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true, 
  },
  category: {
    type: [
      "smartphones",
      "laptops",
      "gaming",
      "televisions",
      "accessories",
      "others",
    ],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isTrending: {
    type: Boolean,
    required: true,
  },
  isBestSeller: {
    type: Boolean,
    required: true,
  },
  isLatest: {
    type: Boolean,
    required: true,
  },
  
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
