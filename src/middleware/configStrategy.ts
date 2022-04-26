import { Request, Response, NextFunction } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import passportCustom from "passport-custom";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import JwtStrategy, { StrategyOptions } from "passport-jwt";
import ExtractJwt from "passport-jwt";
import config from "../../config";


const prisma = new PrismaClient();
const CustomStrategy = passportCustom.Strategy;

// CONFIGURE  ALL STRATEGIES

// CREATE USERS ACCOUNT USING PASSPORT CUSTOM STRATEGY
passport.use("register", new CustomStrategy(
    async (req: Request, done) => {
        try{
            const {firstName, email, password, lastName, username, role} = req.body;
            
            const user = await prisma.user.create({
               data: {
                   username: username,
                   email: email,
                   firstName: firstName,
                   lastName: lastName,
                   password: bcrypt.hashSync(password, 10) ,
                   role: role
               },
            })
            if (!user) {
                return done({message: "Account already exists"}, false);
            }
            console.log(user)
            return done(null, user);
        }catch(error){
            console.log(error);
            return done(error, null)
        }
}));


// LOGIN USERS USING PASSPORT CUSTOM STRATEGY
passport.use("login", new LocalStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
},
    async (req, email, password, done) => {
        try{
            // const {email, password} = req.body
            console.log(email, password);
            let user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            }) 

            if(!user){
                return done(false, null, { message: "Invalid Login Details" });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
    
            if(!isValidPassword){
                return done(false, null, { message: "Invalid Login Details" });
            }
            user.password = "null";
            
            console.log(user);
            return done(null, user);
        }catch(error){
            console.log(error);
            return done(error, null)
        }       
    }
));


// JWT STRATEGY TO VERIFY TOKEN SENT BY REQUESTS
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret
};
passport.use(new JwtStrategy.Strategy(opts, async (token, done) => {
    try{
        const {id, email} = token;
        console.log('token', token.iat)
        const user = await prisma.user.findFirst({
            where: {
                AND: [
                     {
                    email: {
                         equals: email
                        },
                    iat: {
                        equals: (token.iat).toString()
                    }
                }
                ]
            }
        })
        if(!user){
            return done(null, false, {errors: {message: "User Not Authorized"}});
        }
        // try {
        console.log(user)
        return done(null, user);
        //   } catch (error) {
            // done(error);
        //   }
    }catch(error){
        console.log(error);
        return done(error, null);
    }
}));

// STRATEGY TO AUTHENTICATE USER WITH GOOGLE

// export default passport
