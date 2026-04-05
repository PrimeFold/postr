import {Request , Response } from 'express';


export const createBlog=async(req : Request,res:Response)=>{
    const {title,content} = req.body;
}