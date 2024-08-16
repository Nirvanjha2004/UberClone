import { PrismaClient } from "@prisma/client";
import express from "express";
import z from "zod";

export const ridesRouter = express.Router();
const prisma = new PrismaClient();
const statusTypeSchema = z.union([
  z.literal("CANCELLED"),
  z.literal("RIDE DONE"),
]);
type statusType = z.infer<typeof statusTypeSchema>;

export const ride = z.object({
  place: z.string().min(2),
  date: z.string().date(),
  time: z.string().time(),
  price: z.string().min(1).or(z.number().min(1)), //Can change later to string
  statusType: statusTypeSchema,
});


ridesRouter.get('/getAllPastRides', async (req, res)=>{
    const id = Number(req.cookies.userId);
    const user = await prisma.user.findFirst({
        where:{
            id
        }
    })

    if(!user) console.log("user not signed up");

    const userId = user?.id; 

    const pastRides = await prisma.rides.findMany({
        where:{
            userId
        },
        select:{
            fromAddress: true, 
            toAddress  : true, 
            date       : true, 
            userId     : true
        }
    })

    console.log(pastRides); 
    res.json({
        message: "PAST RIDES :",
        pastRides
    })
})
