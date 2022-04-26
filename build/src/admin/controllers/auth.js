"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.adminLogin = exports.adminRegister = void 0;
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../../middleware/admin/admin-configStrategy");
var config_1 = __importDefault(require("../../../config"));
var client_1 = require("@prisma/client");
// AUTHENTICATE REQUESTS FUNCTION
var prisma = new client_1.PrismaClient();
var adminRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate("register-admin", { session: false }, function (err, admin, info) {
            if (err || !admin) {
                console.log('error', err);
                return res.status(err.status || 400).json({
                    status: "error",
                    message: "Username or Email already exists",
                }); // get status code from the callback message or use 400(Bad Request).
            }
            admin.password = undefined;
            return res.json({
                status: "success",
                admin: admin,
            });
        })(req, res, next);
        return [2 /*return*/];
    });
}); };
exports.adminRegister = adminRegister;
var adminLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate("login-admin", { session: false }, function (err, admin, info) { return __awaiter(void 0, void 0, void 0, function () {
            var token, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err || !admin) {
                            return [2 /*return*/, res.status(401).json({
                                    status: "error",
                                    message: info.message,
                                })];
                        }
                        admin.password = undefined;
                        token = jsonwebtoken_1.default.sign({ email: admin.email, username: admin.username }, config_1.default.jwt_secret, { expiresIn: "30d" });
                        decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
                        // const iat = decoded.email;
                        console.log('decoded', decoded.iat);
                        console.log('user', admin.email);
                        return [4 /*yield*/, prisma.adminUsers.update({
                                where: {
                                    email: admin.email,
                                },
                                data: {
                                    iat: (decoded.iat).toString(),
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json({ status: "success", token: token })];
                }
            });
        }); })(req, res, next);
        return [2 /*return*/];
    });
}); };
exports.adminLogin = adminLogin;
var isAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate('jwt', { session: false })(req, res, next);
        return [2 /*return*/];
    });
}); };
exports.isAdmin = isAdmin;
