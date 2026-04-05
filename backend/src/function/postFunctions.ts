import {Request , Response } from 'express';
import  Post  from '../db/post';


type Req = Request;
type Res = Response;

export const createPost = async(req : Req,res:Res)=>{
    try {
        const {title,content} = req.body;
        const author = (req as any).user.id;

        const newPost = await Post.create({title,content,author});

        return res.status(201).json({message:"Post created",newPost})

    } catch (error) {
        return res.status(500).json({
            message:"Couldn't create Post"
        })
    }
}

export const updatePost = async(req:Req,res:Res)=>{
    try {
        
        const id = req.params.id;

        const {title,content}= req.body;

        const updatedPost = await Post.findByIdAndUpdate(id,{title,content},{new:true})

        if(!updatedPost){
            return res.status(404).json({
                message:"Error updating the Post"
            })
        }

        return res.status(201).json({
            message:"Post updated successfully",updatedPost
        })


    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getPosts = async(req:Req,res:Res)=>{
    try {        
        const Posts = await Post.find()
        return res.status(200).json({message:"Posts fetched",Posts})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error.."})
    }

}

export const deletePost = async(req:Req,res:Res)=>{
    try {
        
        const id = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(id)

        if(!deletedPost){
            return res.status(404).json({
                message:"error deleting the Post"
            })
        }

        return res.status(200).json({
            message:"Post was deleted",deletedPost
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error.."
        })
    }
}