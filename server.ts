import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
// import adminRouter from "./src/admin/routes/index";
import apiRouter from "./src/route/index";
import dotenv from "dotenv";
// import adminAuthRoute from "./src/admin/routes/auth-route";

dotenv.config();


const app = express(); //the main app
const admin = express(); // the sub app for admin users;
const api = express(); // the sub app for for client users

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());


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
api.use("/", apiRouter);

// MOUNT THE ADMIN SUB APP
// app.use("/admin", admin);

// MOUNT THE API SUB APP
app.use("/api", api);


// MOUNT THE API SUB APP
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err) res.status(err.status || 500).json({ error: err });
    // next();
});

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
