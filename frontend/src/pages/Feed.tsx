import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { fetchPosts } from '@/api/posts'

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts()
        setPosts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Skeleton className="mb-8 h-10 w-48" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and manage posts from the community
          </p>
        </div>
        <Link to="/create">
          <Button className="shadow-sm">
            <Pencil className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">No posts to display yet.</p>
        )}
        {posts.map((post) => (
          <Card key={post._id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-3">
                <Avatar className="h-6 w-6 ring-2 ring-primary/20">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {post.author?.username?.charAt(0).toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                {post.author?.username || 'Unknown'}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />{' '}
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {post.content.length > 200
                  ? post.content.slice(0, 200) + '...'
                  : post.content}
              </p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <span>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Feed
