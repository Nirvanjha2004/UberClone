import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();


const db  = new PrismaClient();
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //Agar pehle findFirst krke and then set krte na final amount to ye dikkat thi ki agar do req jaldi jaldi aa gye to dono ke paas balance 0 jayega jab user ka balance find krenge to....and suppose pehle 0 the.... to pehle txn me 0 + 200 hone chaiye the and then 200 + 400 hone chhaiye the....but agar fast req aa gye to...dono req ko balance 0 jayega.

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);