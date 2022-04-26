"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var adminAuthRoute = express_1.default.Router();
// REGISTER ADMIN
adminAuthRoute.post("/register", auth_1.adminRegister);
// LOGIN ADMIN
adminAuthRoute.post("/login", auth_1.adminLogin);
exports.default = adminAuthRoute;
