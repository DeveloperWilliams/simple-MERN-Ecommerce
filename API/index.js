import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors"; // for cross-origin requests
import dotenv from "dotenv"; // for environment variables
import bcrypt from "bcrypt"; // for password hashing

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error)); 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})  
