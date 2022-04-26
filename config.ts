import dotenv from 'dotenv';

dotenv.config();

const {
    JWT_SECRET,
    PORT,

} = process.env;


const config = {
    jwt_secret: JWT_SECRET,
    port: PORT,
};


export default config;