// routes/restaurantRoutes.js
import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// Get All Restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// Add Restaurant
router.post("/", async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  await newRestaurant.save();
  res.json(newRestaurant);
});

export default router;
