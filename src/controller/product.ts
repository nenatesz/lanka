import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "cloudinary";
import moment from "moment";
import fs from "fs";

/**
 * filter by month and year
 * and also get the total products
 * 
 */
const prisma = new PrismaClient();

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  });

// CREATE A PRODUCT
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, countInStock, category} = req.body;
    const files  = req.files as Express.Multer.File[];
    console.log(files)
    
    const urls: string[] = [];    
    for (const file of files) {
        const path = file.path;
        console.log("for loop")
        try{
            const result = await cloudinary.v2.uploader.upload(path, {
                resource_type: "auto",
                use_filename: true,
                folder: `lanka-uploads`
            });
            console.log("result", result)
            if(!result) {
                return res.status(400).json({ 
                    message: "Failed to upload files",
                });
            }
            urls.push(result.secure_url);
            fs.unlinkSync(path);
        }catch(err){
            console.log(err)
        }            
    }
    console.log("urls", urls)

    if (urls.length === 0) {
        return res.status(400).json({
            message: "No files uploaded"
        });
    }      
    const product = await prisma.product.create({
        // upload a video and image to cloudinary and save the url to the database 

        data: {
            userId: (<any>req.user).id,
            name: name,
            price: parseInt(price),
            countInStock: parseInt(countInStock),
            fileurl: urls,
            category: category
        }
    });
    if (!product){
        return res.status(400).json({ 
            message: "Product not created",
        });
    }
    console.log("product", product)
    return res.json({status: "success", product});
};

// GET ALL PRODUCTS
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    let products;
    if(req.query){
        const {category, gt, lt} = req.query;
        let price;
        const _category = <string>category
        console.log("category", _category);
        if(gt){            
           price =  {gte: parseInt(<string>gt)}
        }else if(lt){
            price =  {lte: parseInt(<string>lt)}
        }
        products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            {
                                category: {equals: _category},
                            },
                            {
                                price: price
                            }
                        ]
                },
                {
                    category: {equals: _category},
                },
                {
                    price: price
                }
            ]
            }
        });
    }else{
        products = await prisma.product.findMany();
        console.log('user', req.user)
    }
    if (products.length === 0) {
        return res.status(400).json({
            status: "error",
            message: "Products not found",
        });
    }
    return res.json({status: "success", products});
};

// GET A PRODUCT BY ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })
    if (!product){
        return res.status(400).json({
            status: "error",
            message: "Product not found",
        });
    }

    return res.json({status: "success", product});
};

// DELETE A PRODUCT

// GET FILTERED PRODUCTS
export const getFilteredProducts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {category, gt, lt} = req.query;
        let price;
        const _category = <string>category
        console.log("category", _category);
        if(gt){            
           price =  {gte: parseInt(<string>gt)}
        }else if(lt){
            price =  {lte: parseInt(<string>lt)}
        }
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            {
                                category: {equals: _category},
                            },
                            {
                                price: price
                            }
                        ]
                },
                {
                    category: {equals: _category},
                },
                {
                    price: price
                }
            ]
            }
        });
        if (!products){
            return res.status(400).json({
                status: "error",
                message: "Products not found",
            });
        }
        return res.json({status: "success", products});

    }catch(err){
        console.log(err)
    }
}