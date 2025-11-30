import express from "express";
import swaggerUi from "swagger-ui-express";
import serveStatic from "serve-static";
import path from "path";
import { fileURLToPath } from "url";
import { swaggerDocument } from "./swagger.js";
import orderRoutes from "./order.js";
import itemRoutes from "./itens.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerAssets = path.join(
    __dirname,
    "../node_modules/swagger-ui-dist"
);

app.use("/swagger-ui-dist", serveStatic(swaggerAssets));

app.get(
    "/docs",
    swaggerUi.setup(swaggerDocument, {
        customCssUrl: "/swagger-ui-dist/swagger-ui.css",
        customJs: "/swagger-ui-dist/swagger-ui-bundle.js",
        customfavIcon: "/swagger-ui-dist/favicon-32x32.png"
    })
);

app.use("/order", orderRoutes);
app.use("/itens", itemRoutes);

app.get("/", (req, res) => {
    res.redirect("/docs");
});

export default app;
