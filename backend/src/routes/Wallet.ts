import { PrismaClient } from '@prisma/client';
import express from 'express'

export const paymentRouter = express.Router(); 

const prisma = new PrismaClient();

paymentRouter.get('/getallpay', async (req, res)=>{
    const id = Number(req.cookies.userId);
    const foundUser = await prisma.user.findFirst({
        where:{
            id
        }
    })

    if(!foundUser){
        console.log("User not found while extracting the payment info!");
    }

    const userId = foundUser?.id; 
    const pastPayments = await prisma.wallet.findMany({
        where:{
            userId
        },
        select:{
            balance :true, 
            payments: true
        }
    })
    console.log(pastPayments);
    if(!pastPayments) console.log("Error Finding past Payments");

    res.json({
        message : "Your past payment and current amount : ",
        pastPayments
    })
})