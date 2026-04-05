import express from 'express'
import { login, signup } from '../function/userFunctions';
import { auth } from '../middleware/auth';
import { deletePost, getPosts, updatePost } from '../function/postFunctions';

const router = express.Router();

//blog fetching and editing routes..

router.get('/posts',getPosts)
router.put('/post/:id',auth,updatePost)
router.delete('/user/blogs/:id',auth,deletePost)

//authentication and user creation..
router.post('/signup',signup);
router.post('/login',login)


export default router;