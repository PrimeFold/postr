import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const fetchPosts = async()=>{
    const response = await axios.get(`${BASE_URL}/get-posts`)
    return response.data.Posts
}