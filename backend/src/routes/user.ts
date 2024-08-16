//Authentication - sign in, sign out
//Sign Up is only for the driver
import { PrismaClient } from '@prisma/client';
import express from 'express'
import z from 'zod'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
export const userRouter = express.Router();

userRouter.use(cookieParser());
const prisma = new PrismaClient();
export const userInput = z.object({
    username: z.string(),
    password: z.string().min(8),
    firstName: z.string().min(2), 
    lastName : z.string()
})

export const RidingPriceInput = z.object({
    fromAddress: z.string(),
    toAddress : z.string()
})

export const RiderInput = z.object({
    pickUpLocation : z.string(),
    dropOffLocation: z.string()
})

export const pickupTimeAndDate = z.object({
    Time: z.string().time(),
    Date: z.string().date()
})



userRouter.post('/signup',async (req, res)=>{
    const data = req.body;
    const {success} = userInput.safeParse(data);
    if(!success){
        console.log("input data is either incorrect or can not be retrieved!");
    }
    const newUser = await prisma.user.create({
        data:{
            username : data.username, 
            password : data.password,
            firstName : data.firstName, 
            lastName : data.lastName,
        }
    })

    if(!newUser){
        console.log("User creation not successfull");
    }
    res.cookie('userId', newUser.id);
    
})

userRouter.post('/signin', async(req, res)=>{
    const data = req.body; 
    const {success} = userInput.safeParse(data); 
    if(!success){
        console.log("signin failed, cant retrieve data from the req.body");
    }

    const checkUser = await prisma.user.findFirst({
        where:{
            username: data.username
        }
    })

    if(!checkUser) console.log("Error finding user....Sign up first");

    const token = jwt.sign(data.username, "secretkey");
    if(!token){
        console.log("Token not generated", token);
    }

    res.cookie('jwttoken', token);
    res.send("Logged in!");
    //yahan check krna ha ke what to do after token generation probably set in the headers or cookies.

})

// calculating the distance will be done on the client side-
// 1. Store the from and to address to a distance state and then send it using an api to the geocod.io and extract the latititude and longitude
// 2. Now send these to another api to calculate the distance using the haversine formula


userRouter.post('/getAddress', (req, res)=>{
    const fromAddress = req.body;
    const toAddress = req.body;


})

userRouter.post('/rides', (req, res)=>{
    const pickUpLocation = req.body; 
    const dropOffLocation = req.body;
    const Time = req.body
})