"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, JWT_SECRET = _a.JWT_SECRET, PORT = _a.PORT;
var config = {
    jwt_secret: JWT_SECRET,
    port: PORT,
};
exports.default = config;
