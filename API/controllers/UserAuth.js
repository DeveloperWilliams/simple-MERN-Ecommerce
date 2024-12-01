import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/nodemailer.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

// Login the user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    // Create a JWT token with user ID only
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });

    // Send the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Logout the user
export const logOutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "User logged out successfully" });
};

// Verify the user's email
export const verifyEmail = async (req, res) => {
  const verificationToken = req.params.verificationToken;

  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Resend verification email

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const verificationToken = new User().generateVerificationToken();
    user.verificationToken = verificationToken;
    await user.save();
    await sendVerificationEmail(user.email, verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const resetToken = new User().generateVerificationToken();
    user.verificationToken = resetToken;
    await user.save();
    await sendVerificationEmail(user.email, resetToken);
    res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// New password
export const resetPassword = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const { password } = req.body;
  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//make user admin
export const makeUserAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // Corrected line
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "User is now an admin" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//make user super admin user must be admin
export const makeUserSuperAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // Corrected line for querying
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.role !== "admin") { // Corrected condition for role check
      return res.status(400).json({ message: "User is not an admin" });
    }
    
    user.role = "superAdmin";
    await user.save();
    res.status(200).json({ message: "User is now a super admin" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
  
//  