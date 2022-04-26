"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../../controller/auth");
var userAuthRoute = express_1.default.Router();
// REGISTER ADMIN
userAuthRoute.post("/register", auth_1.userRegister);
// LOGIN ADMIN
userAuthRoute.post("/login", auth_1.userLogin);
exports.default = userAuthRoute;
