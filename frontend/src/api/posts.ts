import api from "./axios"

export const fetchPosts = async()=>{
    const response = await api.get('/get-posts')
    return response.data.Posts
}

export const fetchMyPosts = async()=>{
    const response = await api.get('/my-posts')
    return response.data.myPosts
}
