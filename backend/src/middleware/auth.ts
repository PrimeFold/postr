import {Response , Request , NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export const auth = (req:Request,res:Response,next:NextFunction)=>{

    const header = req.headers.authorization;

    if(!header){
        return res.status(401).json({
            message:"token not provided.."
        })
    }

    const token = header.split(" ")[1];

    try {
        
        const decoded = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string
        );

        (req as any).user = decoded;

        next();


    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}