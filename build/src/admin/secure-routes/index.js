"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("./product"));
var auth_1 = require("../controllers/auth");
var secureRoutes = express_1.default.Router();
secureRoutes.use(auth_1.isAuthUser);
secureRoutes.use("/product", product_1.default);
exports.default = secureRoutes;
