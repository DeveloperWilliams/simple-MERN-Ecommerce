import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // for cross-origin requests
import dotenv from "dotenv"; // for environment variables
import "./config/db.js"; // connect to MongoDB
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/UserRoutes.js"  

// Initialize express
const app = express();
dotenv.config(); // for environment variables

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Mongo Connection 
connectDB();

// Route end point 
app.get("/", (req, res) => { 
  res.send("API is running...");
});

// Routes
app.use("/api/auth", userRoutes);
   

// listen to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
 