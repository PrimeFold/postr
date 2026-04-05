import express from 'express'

const router = express.Router();

//blog fetching and editing routes..
router.get('/user/blogs')
router.put('/user/blogs/:id')
router.delete('/user/blogs/:id')


export default router;