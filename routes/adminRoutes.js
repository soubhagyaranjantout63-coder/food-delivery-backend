import express from "express";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

/* ================= ADD ITEM ================= */
router.post("/add-item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json({ message: "Item added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
});

/* ================= DELETE ITEM ================= */
router.delete("/delete-item/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

/* ================= UPDATE ITEM ================= */
router.put("/update-item/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);

  } catch (err) {
    res.status(500).json({ message: "Error updating item" });
  }
});


/* ================= GET ALL ORDERS ================= */
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/* ================= UPDATE ORDER STATUS ================= */
router.put("/update-status/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

/* ================= VERIFY PAYMENT ================= */
router.put("/verify-payment/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.paymentStatus = "Paid";
    order.status = "Preparing";

    await order.save();

    res.json({ message: "Payment verified" });

  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* ================= DELETE USER ================= */
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User removed successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error removing user" });
  }
});


export default router;