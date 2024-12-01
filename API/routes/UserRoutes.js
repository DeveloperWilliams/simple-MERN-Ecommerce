import express from "express";
import {
  forgotPassword,
  loginUser,
  logOutUser,
  registerUser,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  makeUserAdmin,
  makeUserSuperAdmin
} from "../controllers/UserAuth.js";
import AuthToken from "../middleware/Auth.js";
import { isAdmin, isSuperAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email/:verificationToken", verifyEmail);
router.post("/resend-verification", AuthToken, resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:verificationToken", resetPassword);
router.post("/logout", logOutUser);
router.post("/make-admin", AuthToken, isAdmin, isSuperAdmin, makeUserAdmin);
router.post("/make-super-admin", AuthToken, isAdmin, isSuperAdmin, makeUserSuperAdmin);


export default router;
