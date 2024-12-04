import mongoose from "mongoose";


async function connectDB () {
    try {
        mongoose.connect(process.env.MONGO_URI_TEST);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log("MongoDB connection FAIL", error);
        process.exit(1);
    }
}

export default connectDB;

