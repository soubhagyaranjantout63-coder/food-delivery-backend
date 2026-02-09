import express from "express";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { sendOTP } from "../utils/sendOtp.js";

const router = express.Router();

/* ================= SEND OTP ================= */

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    await sendOTP(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= VERIFY OTP ================= */

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });

    await Otp.deleteMany({ email });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
