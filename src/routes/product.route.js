import { Router } from "express";
import { createProduct, getCategory, getCategoryWiseProduct, getSingleProduct } from "../controller/product.controller.js";
const productRouter = Router();
productRouter.post("/create", createProduct);
productRouter.get("/category", getCategory);
productRouter.get("/:category", getCategoryWiseProduct);
productRouter.get("/product/:_id", getSingleProduct);
export default productRouter;

