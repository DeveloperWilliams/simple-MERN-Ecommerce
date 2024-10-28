import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/nodemailer.js";
import User from "../models/User.js";

// Create a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: new User().generateVerificationToken(), // Generate and assign the verification token
    });

    // Save the user to the database
    await user.save();

    // Send the verification email
    await sendVerificationEmail(user.email, user.verificationToken);

    // Response to the client side
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
};
