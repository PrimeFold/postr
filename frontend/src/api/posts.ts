import api from "./axios"

const BASE_URL = 'http://localhost:3000'

export const fetchPosts = async()=>{
    const response = await api.get(`${BASE_URL}/get-posts`)
    return response.data.Posts
}

export const fetchMyPosts = async()=>{
    const response = await api.get(`${BASE_URL}/my-posts`)
    return response.data.Posts
}
