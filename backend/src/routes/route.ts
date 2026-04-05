import express from 'express'
import { signup } from '../function/userFunctions';

const router = express.Router();

//blog fetching and editing routes..

router.get('/user/blogs')
router.put('/user/blogs/:id')
router.delete('/user/blogs/:id')

//authentication and user creation..
router.post('/user',signup);


export default router;