import express from "express";
import { forgotPassword, loginUser, logOutUser, registerUser, resendVerificationEmail, resetPassword, verifyEmail } from "../controllers/UserAuth.js";
import AuthToken from "../middleware/Auth.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email/:verificationToken", verifyEmail);
router.post("/resend-verification", AuthToken, resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:verificationToken", resetPassword);
router.post("/logout", logOutUser);


export default router;          