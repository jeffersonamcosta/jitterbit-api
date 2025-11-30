import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    price: Number
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
