import express from 'express'
import { editEmail, editUsername, login, logout, RefreshToken, signup } from '../function/userFunctions';
import { authMiddleware } from '../middleware/auth';
import { createPost, deletePost, getPosts, updatePost } from '../function/postFunctions';
import { limiter } from '../middleware/ratelimit';

import rateLimit from 'express-rate-limit';
const router = express.Router();

const editLimiter = rateLimit({
    windowMs:60*60*24*15*1000,
    max:1
})


//blog fetching and editing routes..
router.post('/create-post',authMiddleware,createPost)
router.get('/get-posts',getPosts)
router.put('/post/:id',authMiddleware,updatePost)
router.delete('/user/post/:id',authMiddleware,deletePost)

//authentication and user account update..
router.post('/signup',limiter,signup);
router.post('/login',limiter,login)
router.put('/edit-username',editLimiter,authMiddleware,editUsername)
router.put('/edit-email',editLimiter,authMiddleware,editEmail)
router.post('/refresh', RefreshToken);
router.post('/logout', logout);

export default router;