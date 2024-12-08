import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // for cross-origin requests
import dotenv from "dotenv"; // for environment variables
import "./config/db.js"; // connect to MongoDB
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/UserRoutes.js"  
import productRoutes from "./routes/ProductRoutes.js"; // Import the Product route
import homeRoute from "./routes/homeRoute.js"

// Initialize express
const app = express();
dotenv.config(); // for environment variables

// Middleware 
app.use(express.json());
app.use(cookieParser()); //cookie parse
app.use(cors());

// Mongo Connection 
connectDB();

// Route end point 


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes); // Use the Product routes
app.use("/", homeRoute)
   

// listen to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`); // Server is running on port 8080
});
 