import Product from "../models/Product.js";
import multer from "multer";
import path from "path";

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to prevent conflicts
  },
});

// Filter for images only
const fileFilter = (req, file, cb) => { 
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create a new product with image upload support
export const createProduct = async (req, res) => {
  upload.array("imgUrls")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, category, price, trending, description, countInStock } =
      req.body;

    // Get the image paths
    const imgUrls = req.files.map((file) => file.path);

    try {
      const newProduct = new Product({
        name,
        category,
        price,
        trending,
        description,
        countInStock,
        imgUrls,
      });
      await newProduct.save();
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

// Update a product with image upload support
export const updateProduct = async (req, res) => {
  upload.array("imgUrls")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, category, price, trending, description, countInStock } =
      req.body;

    // Get the image paths
    const imgUrls = req.files.map((file) => file.path);

    try {
      const product = await Product.findById(req.params.id);

      if (product) {
        product.name = name;
        product.category = category;
        product.price = price;
        product.trending = trending;
        product.description = description;
        product.countInStock = countInStock;
        product.imgUrls = imgUrls;

        await product.save();
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};


// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get trending products
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ trending: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Search products by name 
export const searchProducts = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get products by price range

export const getProductsByPriceRange = async (req, res) => {
    try {
        const products = await Product.find({
        price: { $gte: req.query.min, $lte: req.query.max },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


// Get products by price range and category

export const getProductsByPriceRangeAndCategory = async (req, res) => {
    try {
        const products = await Product.find({
        price: { $gte: req.query.min, $lte: req.query.max },
        category: req.params.category,
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


//