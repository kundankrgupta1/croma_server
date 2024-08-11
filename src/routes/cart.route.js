import { Router } from "express";
import { addToCart } from "../controller/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter.post("/add-to-cart", authMiddleware, addToCart);

export default cartRouter;
