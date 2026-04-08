import {Response, Request } from 'express'
import User from '../db/user';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { signupSchema } from '../validation/zod';
import { AuthRequest } from '../types';


export const signup =async(req:AuthRequest,res:Response)=>{
    try {
        const result = signupSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                message:"Invalid Input"
            })
        }

        const {username,email,password} = result.data;


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

        return res.status(201).json({message:"User created successfully",user:{
            username,
            email,
        }})

    } catch (error) {
        
        return res.status(500).json({
            message:"Internal Server Error"
        })


    }

}

export const login = async(req:AuthRequest , res:Response )=>{
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

        const accessToken = jwt.sign(
            {id:UserExists._id.toString() },
            process.env.JWT_SECRET as Secret,
            {expiresIn:'15m'}
        )

        const refreshToken = jwt.sign(
            {id:UserExists._id.toString()},
            process.env.JWT_REFRESH_SECRET as Secret,
            {expiresIn:'7d'}
        )

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        await User.findByIdAndUpdate(UserExists._id, { refreshToken });

        return res.status(200).json({
            message:"Login successfull",
            accessToken,
            user:{
                id:UserExists._id,
                username:UserExists.username,
                email:UserExists.email
            }
        })
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})        
    }
}


export const editUsername = async(req:AuthRequest,res:Response)=>{

    try {
        
        const {username} = req.body;
        const id = req.user!!.id ;
        const newUsername = await User.findByIdAndUpdate(id,{username})

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
export const editEmail = async(req:AuthRequest,res:Response)=>{

    try {
        
        const {email} = req.body;
        const id = req.user!.id;
        const newEmail = await User.findByIdAndUpdate(id,{email})

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

export const RefreshToken = async(req:Request,res:Response)=>{

    const cookieToken = req.cookies?.refreshToken;

    if(!cookieToken){
        return res.status(401).json({
            message:"Refresh token not found.."
        })
    }

    try {
        
        const decode = jwt.verify(cookieToken,process.env.JWT_REFRESH_SECRET as Secret) as jwt.JwtPayload;
        const userId = decode.id;
        const user = await User.findById(userId)

        if(!user || user.refreshToken!=cookieToken){
            return res.status(403).json({
                message:"Invalid refresh token"
            })
        }

        const newAccessToken = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET as Secret,
            {expiresIn:'15m'}
        )

        const newRefreshToken = jwt.sign(
            {id:user._id},
            process.env.JWT_REFRESH_SECRET as Secret,
            {expiresIn:'7d'}
        )

        await User.findByIdAndUpdate(user._id,{refreshToken:newRefreshToken})

        res.cookie('refreshToken',newRefreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        })

        return res.json({token:newAccessToken})


    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

}

export const logout = async(req:AuthRequest,res:Response)=>{
    const cookieToken = req.cookies?.refreshToken;

    if(cookieToken){
        await User.findOneAndUpdate({refreshToken:cookieToken},{refreshToken:null})
    }

    res.clearCookie('refreshToken');
    return res.json({message:"Logged out successfully"})

}