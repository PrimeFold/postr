import {Response , Request , NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types';
import { AuthRequest } from '../types';

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction)=>{

    const header = req.headers.authorization;

    if(!header){
        return res.status(401).json({
            message:"token not provided.."
        })
    }

    const token = header.split(" ")[1];

    try {
        
        const decoded = jwt.verify(token as string,process.env.JWT_SECRET!) as unknown as {id:string; username:string}

        req.user = decoded;

        next();


    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}