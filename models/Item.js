import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    rating: Number,
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;