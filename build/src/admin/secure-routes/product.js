"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = require("../controllers/product");
require("../../middleware/configStrategy");
var multer_1 = __importDefault(require("../../middleware/multer"));
var productRouter = express_1.default.Router();
// productRouter.use(isAuthUser);
productRouter.post("/", multer_1.default.array('files'), product_1.createProduct);
productRouter.get("/", product_1.getAllProducts);
exports.default = productRouter;
