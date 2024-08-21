import express from 'express'
import { ridesRouter } from './routes/Rides'
import { userRouter } from './routes/user';
import { paymentRouter } from './routes/Wallet';
const app = express()
const port = 3000
app.use(express.json())
app.use('/', userRouter);
app.use('/rides/', ridesRouter);
app.use('/wallet', paymentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})