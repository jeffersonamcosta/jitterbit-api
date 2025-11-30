import express from "express";
import { connect } from "./db.js";
import Order from "../models/Order.js";

const router = express.Router();

function mapOrder(body) {
    return {
        orderId: body.numeroPedido,
        value: body.valorTotal,
        creationDate: body.dataCriacao,
        items: body.items.map(i => ({
            productId: Number(i.idItem),
            quantity: i.quantidadeItem,
            price: i.valorItem
        }))
    };
}

router.post("/criar", async (req, res) => {
    await connect();
    const data = mapOrder(req.body);
    const order = await Order.create(data);
    res.status(201).json(order);
});

router.get("/listar", async (req, res) => {
    await connect();
    const orders = await Order.find();
    res.json(orders);
});

router.get("/buscar/:id", async (req, res) => {
    await connect();
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ erro: "Pedido não encontrado" });
    res.json(order);
});

router.put("/atualizar/:id", async (req, res) => {
    await connect();
    const data = mapOrder(req.body);
    const updated = await Order.findOneAndUpdate(
        { orderId: req.params.id },
        data,
        { new: true }
    );
    res.json(updated);
});

router.delete("/deletar/:id", async (req, res) => {
    await connect();
    await Order.deleteOne({ orderId: req.params.id });
    res.json({ msg: "Pedido deletado" });
});

export default router;
