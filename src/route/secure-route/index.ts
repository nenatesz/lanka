import express from "express";
import productRouter from "./product";
import {isAdmin, isAuthUser} from "../../controller/auth";

const secureRoutes = express.Router();

secureRoutes.use(isAuthUser);

secureRoutes.use("/product",  productRouter);



export default secureRoutes;