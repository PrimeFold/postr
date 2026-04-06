import express, { NextFunction, Request , Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnect from './db/mongo';
import router from './routes/route';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(helmet())
app.use(cors())
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