import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  deliveryTime: String,
  category: String
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
