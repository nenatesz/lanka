"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth-route"));
var index_1 = __importDefault(require("./secure-routes/index"));
var adminRouter = express_1.default.Router();
adminRouter.use("/auth", auth_route_1.default);
adminRouter.use("/", index_1.default);
exports.default = adminRouter;
