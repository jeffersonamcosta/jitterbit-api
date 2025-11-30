import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger.js";
import orderRoutes from "./order.js";
import itemRoutes from "./itens.js";

const app = express();
app.use(express.json());


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/order", orderRoutes);
app.use("/itens", itemRoutes);

app.get("/", (req, res) => {
    res.redirect("/docs");
});

export default app;
