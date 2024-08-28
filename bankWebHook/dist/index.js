"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const db = new client_1.PrismaClient();
app.use(express_1.default.json());
app.post("/hdfcWebhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //Agar pehle findFirst krke and then set krte na final amount to ye dikkat thi ki agar do req jaldi jaldi aa gye to dono ke paas balance 0 jayega jab user ka balance find krenge to....and suppose pehle 0 the.... to pehle txn me 0 + 200 hone chaiye the and then 200 + 400 hone chhaiye the....but agar fast req aa gye to...dono req ko balance 0 jayega.
    try {
        yield db.$transaction([
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
        // Yahan 200 status code aur success message bhejna bhot jaruri ha taaki bank wapas refund na initiate kr de...
        res.json({
            message: "Captured"
        });
    }
    catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        });
    }
}));
app.listen(3003);
