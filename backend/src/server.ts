import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnect from './db/mongo';
import router from './routes/route';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use('/',router)

dbconnect();

app.listen(PORT,()=>{
    console.log("Server started ..")
})