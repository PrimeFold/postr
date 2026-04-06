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


export const editUsername = async(req:Request,res:Response)=>{

    try {
        
        const {username} = req.body;
        const id = (req as any).user.id;
        const newUsername = await User.findByIdAndUpdate(id,username)

        if(!newUsername){
            return res.status(404).json({message:"couldn't update username"})
        }

        return res.status(201).json({
            message:"Username updated successfully",newUsername
        })


    } catch (error) {
        res.status(500).json({
            message:`Internal Server Error ${(error as Error).message}`  
        })
    }
}
export const editEmail = async(req:Request,res:Response)=>{

    try {
        
        const {email} = req.body;
        const id = (req as any).user.id;
        const newEmail = await User.findByIdAndUpdate(id,email)

        if(!newEmail){
            return res.status(404).json({message:"couldn't update Email"})
        }

        return res.status(201).json({
            message:"Email updated successfully",newEmail
        })


    } catch (error) {
        res.status(500).json({
            message:`Internal Server Error ${(error as Error).message}`  
        })
    }
}



