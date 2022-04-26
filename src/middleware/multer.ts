import multer, { FileFilterCallback } from "multer";
import moment from "moment";
import { Request, Response, NextFunction } from "express";


const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     console.log(file, "files")
    //         cb(null, `./src/tmp/`)
       
    // },
    filename: (req: Request, file, cb) => {
        const fileExt = file.originalname.split(".").pop();
        const fileName = `${moment().unix()}.${fileExt}`;
        cb(null, fileName);
    }
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png' || file.mimetype === 'video/mp4') {
        console.log("true")
        cb(null, true)
    } else {
        console.log("false")
        cb(new Error('File type not supported'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // limits: {
    //     fieldNameSize: 200,
    //     fileSize: 30 * 1024 * 1024,
    //   },
});


export default upload;