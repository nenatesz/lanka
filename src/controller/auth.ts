import express from "express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import "../middleware/configStrategy";
import config from "../../config";
import { PrismaClient } from "@prisma/client";


// AUTHENTICATE REQUESTS FUNCTION

const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
        if (err || !user) {
          console.log('error', err);
          return res.status(err.status || 400).json({
            status: "error",
            message: "Email already exists",
          }); // get status code from the callback message or use 400(Bad Request).
        }
        user.password = undefined;
        return res.json({
          status: "success",
          user,
        });
      })(req, res, next);
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("login", {session: false}, async (err, user, info) => {

      if (err || !user) {
        return res.status(401).json({
          status: "error",
          message: info.message,
        });
      }
      
      user.password = undefined;
      const token = jwt.sign({ email: user.email, role: user.role, username: user.username }, <string>config.jwt_secret, { expiresIn: "10d" });

      const decoded: any = jwt.verify(token, <string>config.jwt_secret);
      // const iat = decoded.email;
      console.log('decoded', decoded.role)
      console.log('user', user.email)

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          iat: (decoded.iat).toString(),
        }
      });

      return res.json({ status: "success", token });

    })(req, res, next)
}

export const isAuthUser = async (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('jwt', { session: false })(req, res, next);
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
  if(req.user && (<any>req.user).role === 'ADMIN'){
    next();
  }else{
    res.status(401).send({msg: "Admin Token is not valid."})
  } 
}