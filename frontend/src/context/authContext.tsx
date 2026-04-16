import { createContext,useContext,useState,useEffect} from "react";
import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {logout as logoutApi}  from '@/api/auth'

interface User{
    id:string;
    username:string;
    email:string
}

interface AuthContextType{
    user: User | null;
    isAuthenticated : boolean;
    loading:boolean;
    login:(user:User,token:string) => void;
    logout:()=> Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user,setUser] = useState<User | null>(null)
    const[loading,setLoading]=useState(true)
    const navigate = useNavigate();

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('accessToken')

        if(storedUser&&token){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    },[])

    const login = (userData:User,token:string)=>{
        localStorage.setItem('accessToken',token)
        localStorage.setItem('user',JSON.stringify(userData))
        setUser(userData)
    }

    const logout = async()=>{

        try{
            await logoutApi()
        }catch(error){
            console.error('Logout failed:',error)
        }finally{
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            setUser(null)
            navigate('/login')
        }


    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated:!!user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}




export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used inside an AuthProvider')
    }
    return context
}
