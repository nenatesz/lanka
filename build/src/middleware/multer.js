"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var moment_1 = __importDefault(require("moment"));
var storage = multer_1.default.diskStorage({
    // destination: (req, file, cb) => {
    //     console.log(file, "files")
    //         cb(null, `./src/tmp/`)
    // },
    filename: function (req, file, cb) {
        var fileExt = file.originalname.split(".").pop();
        var fileName = (0, moment_1.default)().unix() + "." + fileExt;
        cb(null, fileName);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        console.log("true");
        cb(null, true);
    }
    else {
        console.log("false");
        cb(new Error('File type not supported'));
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    // limits: {
    //     fieldNameSize: 200,
    //     fileSize: 30 * 1024 * 1024,
    //   },
});
exports.default = upload;
