"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("../../route/auth-route"));
// import secureRoutes from "./secure-routes/index";
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
var userRouter = express_1.default.Router();
userRouter.use("/auth", auth_route_1.default);
//  userRouter.use("/", secureRoutes);
exports.default = userRouter;
