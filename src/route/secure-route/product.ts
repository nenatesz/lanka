import express from "express";
import {isAdmin, isAuthUser} from "../../controller/auth";
import { createProduct, getAllProducts, getFilteredProducts, getProductById } from "../../controller/product";
import passport from "passport";
import "../../middleware/configStrategy";
import upload from "../../middleware/multer";

const productRouter = express.Router();

// productRouter.use(isAuthUser);

// CREATE PRODUCT
productRouter.post("/", isAdmin, upload.array('files'), createProduct);
// GET ALL PRODUCTS
productRouter.get("/?", getAllProducts);
// GET A PRODUCT
productRouter.get("/id/:id", getProductById);
// GET PRODUCTS BY FILTER
productRouter.get("/filter?", getFilteredProducts);

export default productRouter;