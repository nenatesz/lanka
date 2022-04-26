import express from "express";
import { userLogin, userRegister } from "../controller/auth";

const authRoute = express.Router();

// REGISTER ADMIN
authRoute.post("/register", userRegister);

// LOGIN ADMIN
authRoute.post("/login", userLogin);


export default authRoute;