import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/authContext'
import api from '@/api/axios'
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
import {
  Pencil,
  X,
  LayoutGrid,
  FileText,
  PlusCircle,
  LogOut,
  Calendar,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [myPostsCount, setMyPostsCount] = useState<number | null>(null)
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [showEditUsername, setShowEditUsername] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/my-posts')
        const posts = res.data.myPosts || []
        setMyPostsCount(posts.length)
        setRecentPosts(posts.slice(0, 3))
      } catch {
        setMyPostsCount(0)
      }
    }
    loadStats()
  }, [])

  const saveUsername = async () => {
    if (!newUsername.trim()) return toast.error('Username cannot be empty')
    setSaving(true)
    try {
      await api.put('/edit-username', { username: newUsername })
      toast.success('Username updated!')
      setShowEditUsername(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const saveEmail = async () => {
    if (!newEmail.trim()) return toast.error('Email cannot be empty')
    setSaving(true)
    try {
      await api.put('/edit-email', { email: newEmail })
      toast.success('Email updated!')
      setShowEditEmail(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* ===== Sidebar ===== */}
      <aside className="w-56 shrink-0 border-r bg-muted/20 p-4">
        <nav className="space-y-1">
          <button
            onClick={() => navigate('/feed')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <LayoutGrid className="h-4 w-4" />
            Feed
          </button>
          <button
            onClick={() => navigate('/my-posts')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <FileText className="h-4 w-4" />
            Your Posts
          </button>
          <Separator className="my-2" />
          <button
            onClick={() => navigate('/create')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <PlusCircle className="h-4 w-4" />
            Create Post
          </button>
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}</h1>
            <p className="mt-1 text-muted-foreground">Here's an overview of your account.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{myPostsCount ?? '—'}</p>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">Account Email</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{user?.username}</p>
                </div>
                <button onClick={() => { setShowEditUsername(true); setNewUsername(user?.username || '') }}>
                  <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <button onClick={() => { setShowEditEmail(true); setNewEmail(user?.email || '') }}>
                  <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => navigate('/create')}>
              <CardContent className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-3">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">Create Post</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => navigate('/my-posts')}>
              <CardContent className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Your Posts</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your latest posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post._id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => navigate('/my-posts')}>
                  View all posts
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Logout */}
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </main>

      {/* ===== Edit Username Popup ===== */}
      {showEditUsername && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm">
            <CardHeader className="relative">
              <button onClick={() => setShowEditUsername(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
              <CardTitle>Edit Username</CardTitle>
              <CardDescription>Enter your new username</CardDescription>
            </CardHeader>
            <CardContent>
              <Label>New Username</Label>
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="johndoe"
                onKeyDown={(e) => { if (e.key === 'Enter') saveUsername() }}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditUsername(false)}>Cancel</Button>
              <Button onClick={saveUsername} disabled={saving}>
                {saving && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* ===== Edit Email Popup ===== */}
      {showEditEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm">
            <CardHeader className="relative">
              <button onClick={() => setShowEditEmail(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
              <CardTitle>Edit Email</CardTitle>
              <CardDescription>Enter your new email address</CardDescription>
            </CardHeader>
            <CardContent>
              <Label>New Email</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="you@example.com"
                onKeyDown={(e) => { if (e.key === 'Enter') saveEmail() }}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditEmail(false)}>Cancel</Button>
              <Button onClick={saveEmail} disabled={saving}>
                {saving && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
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
