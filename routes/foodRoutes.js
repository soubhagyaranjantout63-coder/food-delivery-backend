import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// GET ALL FOODS
router.get("/", async (req, res) => {
  try {
    const foods = await Item.find();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching foods" });
  }
});

export default router;