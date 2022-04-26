import express from "express";
import authRoute from "./auth-route";
import secureRoutes from "./secure-route/index";

/**
 * the user should:
 * get all products
 * get a single product
 * get products based on a filter (category, price, etc)
 * get products filtered by recently added and date added
 * 
 * the user should also: 
 * register !
 * login !
 * edit account
 * delete account 
 * 
 */

 const apiRouter = express.Router();

 apiRouter.use("/auth", authRoute)
 apiRouter.use("/", secureRoutes);
 
 
 export default apiRouter;