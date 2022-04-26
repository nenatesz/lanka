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
var passport_1 = __importDefault(require("passport"));
var passport_custom_1 = __importDefault(require("passport-custom"));
var client_1 = require("@prisma/client");
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_jwt_1 = __importDefault(require("passport-jwt"));
var passport_jwt_2 = __importDefault(require("passport-jwt"));
var config_1 = __importDefault(require("../../config"));
var prisma = new client_1.PrismaClient();
var CustomStrategy = passport_custom_1.default.Strategy;
// CONFIGURE  ALL STRATEGIES
// CREATE ADMIN ACCOUNT USING PASSPORT LOCAL STRATEGY
passport_1.default.use("register-admin", new CustomStrategy(function (req, done) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, admin, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.adminUsers.create({
                        data: {
                            username: username,
                            email: email,
                            password: bcrypt_1.default.hashSync(password, 10)
                        }
                    })];
            case 1:
                admin = _b.sent();
                console.log(admin);
                return [2 /*return*/, done(null, admin)];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, done(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); }));
// LOGIN ADMIN USING PASSPORT LOCAL STRATEGY
passport_1.default.use("login-admin", new CustomStrategy(function (req, done) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, isValidPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                console.log(email, password);
                return [4 /*yield*/, prisma.adminUsers.findUnique({
                        where: {
                            email: email,
                        }
                    })];
            case 1:
                admin = _b.sent();
                if (!admin) {
                    return [2 /*return*/, done({ message: "User not found" }, false)];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, admin.password)];
            case 2:
                isValidPassword = _b.sent();
                if (!isValidPassword) {
                    return [2 /*return*/, done({ message: "Wrong Password" }, false)];
                }
                console.log(admin);
                return [2 /*return*/, done(null, admin)];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, done(error_2, null)];
            case 4: return [2 /*return*/];
        }
    });
}); }));
// JWT STRATEGY TO VERIFY TOKEN SENT BY REQUESTS
passport_1.default.use(new passport_jwt_1.default.Strategy({
    secretOrKey: config_1.default.jwt_secret,
    jwtFromRequest: passport_jwt_2.default.ExtractJwt.fromAuthHeaderAsBearerToken()
}, function (token, done) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, admin, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = token.id, email = token.email;
                return [4 /*yield*/, prisma.adminUsers.findUnique({
                        where: {
                            email: email,
                        }
                    })];
            case 1:
                admin = _a.sent();
                if (!admin) {
                    return [2 /*return*/, done({ message: "User Authenticated" }, false)];
                }
                try {
                    console.log(admin);
                    return [2 /*return*/, done(null, admin)];
                }
                catch (error) {
                    done(error);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, done(error_3, null)];
            case 3: return [2 /*return*/];
        }
    });
}); }));
// STRATEGY TO AUTHENTICATE USER WITH GOOGLE
exports.default = passport_1.default;
