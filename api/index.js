import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger.js";

const app = express();
app.use(express.json());

// Swagger CDN
const swaggerOptions = {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js"
    ]
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Rotas
import orderRoutes from "./order.js";
import itemRoutes from "./itens.js";

app.use("/order", orderRoutes);
app.use("/itens", itemRoutes);

// Redirect raiz
app.get("/", (req, res) => {
    res.redirect("/docs");
});

export default app;
