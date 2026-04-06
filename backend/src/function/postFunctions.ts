import {Request , Response } from 'express';
import  Post  from '../db/post';
import { AuthRequest } from '../types';


type Res = Response;

export const createPost = async(req : AuthRequest,res:Res)=>{
    try {
        const {title,content} = req.body;
        const author = req.user!.id;

        const newPost = await Post.create({title,content,author});

        return res.status(201).json({message:"Post created",newPost})

    } catch (error) {
        return res.status(500).json({
            message:"Couldn't create Post"
        })
    }
}

export const updatePost = async(req:AuthRequest,res:Res)=>{
    try {
        
        const id = req.params.id;
        const userId = req.user!.id;
        const {title,content}= req.body;
        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({message:"Post not found"})
        }

        if(post.author?.toString()!=userId){
            return res.status(403).json({
                message:"Forbidden"
            })
        }

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

export const getPosts = async(req:AuthRequest,res:Res)=>{
    try {        
        const Posts = await Post.find()
        return res.status(200).json({message:"Posts fetched",Posts})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error.."})
    }

}

export const deletePost = async(req:AuthRequest,res:Res)=>{
    try {
        
        const id = req.params.id;
        const userId = req.user!.id;
        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({
                message:"Post not found"
            })
        }

        if(post.author?.toString()!=userId){
            return res.status(403).json({
                message:"Forbidden"
            })
        }

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