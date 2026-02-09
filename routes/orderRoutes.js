import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* ================= CREATE ORDER ================= */
router.post("/create", async (req, res) => {
  try {
    const { items, total } = req.body;

    const newOrder = new Order({
      items,
      total,
      paymentStatus: "Pending",
      status: "Payment Pending",
    });

    await newOrder.save();

    res.json(newOrder);

  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ================= SUBMIT TRANSACTION ================= */
router.put("/submit-transaction/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.transactionId = req.body.transactionId;
    order.paymentStatus = "Verification Pending";

    await order.save();

    res.json({ message: "Transaction submitted" });

  } catch (err) {
    res.status(500).json({ message: "Error submitting transaction" });
  }
});

export default router;