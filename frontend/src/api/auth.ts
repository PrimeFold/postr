import api from "./axios";

export const login = async(email:string,password:string)=>{

    const response = await api.post('/login',{email,password})
    return response.data;

}

export const signup = async(username:string,email:string,password:string)=>{
    const response = await api.post('/signup',{username,email,password})
    return response.data;
}

export const logout = async()=>{
    const response = await api.post('/logout')
    return response.data;
}


