import {Response , Request } from 'express'
import User from '../db/user';
import bcrypt from 'bcrypt';

export const signup =async(req:Request,res:Response)=>{
    try {
        const {username,password,email} = req.body;


        const existingUser = await User.findOne({$or: [{ username }, { email }]});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        return res.status(201).json({message:"User created successfully",user})

    } catch (error) {
        
        return res.status(500).json({
            message:"Internal Server Error"
        })


    }

}

export const login = async(req:Request , res:Response )=>{
    const {email,password} = req.body;

    const UserExists = await User.findOne({email});
    if(!UserExists){
        return res.status(404).json({message:"User not found.."})
    }

    

}
