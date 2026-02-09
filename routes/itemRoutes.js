import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add-item",
  authMiddleware,
  authorizeRoles("vendor"),
  async (req, res) => {
    res.json({ message: "Vendor can add item" });
  }
);

export default router;
