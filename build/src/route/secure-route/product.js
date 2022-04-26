"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../../controller/auth");
var product_1 = require("../../controller/product");
require("../../middleware/configStrategy");
var multer_1 = __importDefault(require("../../middleware/multer"));
var productRouter = express_1.default.Router();
// productRouter.use(isAuthUser);
// CREATE PRODUCT
productRouter.post("/", auth_1.isAdmin, multer_1.default.array('files'), product_1.createProduct);
// GET ALL PRODUCTS
productRouter.get("/?", product_1.getAllProducts);
// GET A PRODUCT
productRouter.get("/id/:id", product_1.getProductById);
// GET PRODUCTS BY FILTER
productRouter.get("/filter?", product_1.getFilteredProducts);
exports.default = productRouter;
