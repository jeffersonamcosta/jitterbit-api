import { connect } from "./db.js";
import Order from "../models/Order.js";

function mapInput(body) {
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

export default async function handler(req, res) {
    await connect();

    const { method } = req;
    const { id } = req.query;

    // Criar pedido
    if (method === "POST") {
        try {
            const data = mapInput(req.body);
            const order = await Order.create(data);
            return res.status(201).json(order);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    // Listar todos
    if (method === "GET" && !id) {
        const list = await Order.find();
        return res.json(list);
    }

    // Obter 1 pedido
    if (method === "GET" && id) {
        const order = await Order.findOne({ orderId: id });
        if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
        return res.json(order);
    }

    // Atualizar
    if (method === "PUT" && id) {
        const data = mapInput(req.body);
        const updated = await Order.findOneAndUpdate(
            { orderId: id },
            data,
            { new: true }
        );
        return res.json(updated);
    }

    // Delete
    if (method === "DELETE" && id) {
        await Order.deleteOne({ orderId: id });
        return res.json({ message: "Pedido deletado" });
    }

    return res.status(405).json({ error: "Método não permitido" });
}
