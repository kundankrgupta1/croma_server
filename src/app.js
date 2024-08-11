import express from "express";
import cors from "cors";
import router from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(productRouter)
app.use(router)
app.use(cartRouter)
export default app;
