"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// import adminRouter from "./src/admin/routes/index";
var index_1 = __importDefault(require("./src/route/index"));
var dotenv_1 = __importDefault(require("dotenv"));
// import adminAuthRoute from "./src/admin/routes/auth-route";
dotenv_1.default.config();
var app = (0, express_1.default)(); //the main app
var admin = (0, express_1.default)(); // the sub app for admin users;
var api = (0, express_1.default)(); // the sub app for for client users
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/**
 * app.all(/api/*, authentication)
 * use this to add authentication to protected routes
 */
/**
 * Use sub-apps for admin features
 */
// THE ADMIN SUB APP
// admin.use("/", adminRouter);
// THE API(USERS) SUB APP
api.use("/", index_1.default);
// MOUNT THE ADMIN SUB APP
// app.use("/admin", admin);
// MOUNT THE API SUB APP
app.use("/api", api);
// MOUNT THE API SUB APP
app.use(function (err, req, res, next) {
    if (err)
        res.status(err.status || 500).json({ error: err });
    // next();
});
var port = process.env.PORT || 3030;
app.listen(port, function () { return console.log("app running on http://localhost:" + port); });
