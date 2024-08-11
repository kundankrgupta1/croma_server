import { Router } from "express";
import { updateProfile, userLoginAndRegister, verifyOTP } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/auth", userLoginAndRegister);
router.post("/otp", verifyOTP);
router.put("/update-profile/:userID", authMiddleware, updateProfile);

export default router;
