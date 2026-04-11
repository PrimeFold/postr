import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/authContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Pencil, X, LayoutGrid, FileText, PlusCircle } from 'lucide-react'
import api from '@/api/axios'
import toast from 'react-hot-toast'
import { fetchMyPosts } from '@/api/posts'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newUsername,setNewUsername] = useState('')
  const [newEmail,setNewEmail] = useState('')
  const [showEditUsername, setShowEditUsername] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)

  const saveUsername = async()=>{
    
    try {
        await api.put('/edit-username',{username:newUsername})
        setShowEditUsername(false)
        toast.success("username changed successfully!")
        
    } catch (error) {
        toast.error((error as any).respose?.data?.message || 'Failed to update username')
    }
    

  }
  const saveEmail = async()=>{
    
    try {
        await api.put('/edit-email',{email:newEmail})
        setShowEditEmail(false)
        toast.success("email changed successfully!")
        
    } catch (error) {
        toast.error((error as any).response?.data?.message || 'Failed to update email')
    }
    

  }


  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* ===== Sidebar ===== */}
      <aside className="w-56 border-r bg-muted/20 p-4">
        <nav className="space-y-1">
          <button
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
            onClick={() => navigate('/feed')}
          >
            <LayoutGrid className="h-4 w-4" />
            Feed
          </button>
          <button
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
            onClick={() => navigate('/my-posts')}
          >
            <FileText className="h-4 w-4" />
            Your Posts
          </button>
          <Separator className="my-2" />
          <button
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
            onClick={() => navigate('/create')}
          >
            <PlusCircle className="h-4 w-4" />
            Create Post
          </button>
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-xl space-y-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{user?.username}</p>
                </div>
                <button onClick={() => setShowEditUsername(true)}>
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <button onClick={() => setShowEditEmail(true)}>
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* ===== Edit Username Popup ===== */}
      {showEditUsername && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm">
            <CardHeader className="relative">
              <button onClick={() => setShowEditUsername(false)} className="absolute right-4 top-4 text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
              <CardTitle>Edit Username</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>New Username</Label>
              <Input value={newUsername} onChange={(e)=>setNewUsername(e.target.value)} placeholder="johndoe" />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditUsername(false)}>Cancel</Button>
              <Button onClick={saveUsername}>  
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Edit Email Popup*/}
      {showEditEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm">
            <CardHeader className="relative">
              <button onClick={() => setShowEditEmail(false)} className="absolute right-4 top-4 text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
              <CardTitle>Edit Email</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>New Email</Label>
              <Input type="email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} placeholder="you@example.com"/>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditEmail(false)}>Cancel</Button>
              <Button onClick={saveEmail}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Dashboard
