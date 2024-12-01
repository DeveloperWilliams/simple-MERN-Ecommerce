import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  trending: {
    type: Boolean,
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
