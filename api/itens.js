import express from "express";
import { connect } from "./db.js";
import Item from "../models/Item.js";

const router = express.Router();

router.post("/criar", async (req, res) => {
    try {
        await connect();
        const novoItem = await Item.create(req.body);
        res.status(201).json({
            msg: "Item criado com sucesso",
            data: novoItem
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});


router.get("/listar", async (req, res) => {
    try {
        await connect();
        const itens = await Item.find();
        res.json(itens);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});


router.get("/buscar/:id", async (req, res) => {
    try {
        await connect();
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item não encontrado" });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});


router.put("/atualizar/:id", async (req, res) => {
    try {
        await connect();

        const atualizado = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!atualizado) {
            return res.status(404).json({ msg: "Item não encontrado" });
        }

        res.json({
            msg: "Item atualizado",
            data: atualizado
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});


router.delete("/deletar/:id", async (req, res) => {
    try {
        await connect();

        const deletado = await Item.findByIdAndDelete(req.params.id);

        if (!deletado) {
            return res.status(404).json({ msg: "Item não encontrado" });
        }

        res.json({ msg: "Item deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

export default router;
