import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    price: Number
});

const OrderSchema = new mongoose.Schema({
    orderId: String,
    value: Number,
    creationDate: Date,
    items: [ItemSchema]
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
