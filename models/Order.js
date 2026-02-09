import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: Array,
    total: Number,

    status: {
      type: String,
      default: "Pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);