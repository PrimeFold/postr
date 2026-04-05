import {Response , Request } from 'express'
import User from '../db/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
    try {
        const {email,password} = req.body;

        const UserExists = await User.findOne({email});
        if(!UserExists){
            return res.status(404).json({message:"User not found.."})
        }

        const valid = await bcrypt.compare(password,UserExists.password);

        if(!valid){
            return res.status(401).json({message:"Password is invalid.."})
        }

        const token = jwt.sign(
            {id:UserExists._id},
            process.env.JWT_SECRET as string,
            {expiresIn:'1d'}
        )

        return res.status(200).json({
            message:"Login successfull",
            token,
            user:{
                id:UserExists._id,
                username:UserExists.username,
                email:UserExists.email
            }
        })
        
    } catch (error) {
        return res.status(404).json({message:"Internal server error"})        
    }
    

}
