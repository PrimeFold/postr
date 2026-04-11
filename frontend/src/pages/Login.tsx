import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@/api/auth"
import toast  from 'react-hot-toast'
import { useAuth } from "@/context/authContext"


const Login = () => {

  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async(e:any)=>{

    e.preventDefault();
    setError('')
    setLoading(true)

    try {

      const response = await login(email,password)
      authLogin(response.user, response.accessToken)
      toast.success('Logged in successfully!')
      navigate('/feed')
    } catch (error:any) {
      const errmsg = error.response?.data?.message || 'Login failed'
      setError(errmsg)
      toast.error(errmsg)

    }finally{
      setLoading(false)
    }
  }

  
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">P</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Log in to your Postr account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" value={email} placeholder="you@example.com" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input type='password' value={password} placeholder="*******" onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full shadow-sm" disabled={loading} type="submit">
              {loading? 'Logging in...' : 'Log in'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
