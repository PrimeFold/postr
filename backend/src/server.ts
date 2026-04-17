import express, { NextFunction, Request , Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnect from './db/mongo';
import router from './routes/route';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

dotenv.config();




const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use('/',router)

dbconnect();

app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})

app.use((err:Error , req:Request,res:Response,next:NextFunction)=>{
    console.error(err.message);
    return res.status(500).json({message:"Something went wrong"})
})


app.listen(PORT,()=>{
    console.log("Server started ..")
})