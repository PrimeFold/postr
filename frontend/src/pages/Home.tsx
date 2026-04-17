import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Pencil, Clock } from "lucide-react"
import GithubButton from "@/components/githubstar"
import { fetchPosts } from '@/api/posts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Loader from "@/components/loading"

const Home = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts()
        // Ensure data is array and reverse to display actual recent (newest) posts first
        if (Array.isArray(data)) {
          setPosts([...data].reverse().slice(0, 3))
        } else if (data && data.Posts && Array.isArray(data.Posts)) {
          setPosts([...data.Posts].reverse().slice(0, 3))
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error("Failed to load posts:", error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/40">
        <div className="container mx-auto px-4 py-28 text-center">
          <Badge variant="secondary" className="mb-4 bg-background/80 shadow-sm">
            <Pencil className="mr-1 h-3 w-3" /> A simple blogging platform
          </Badge>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Share your <span className="text-primary">thoughts</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Create, read, and discuss posts from a community of writers. Postr
            makes blogging easy and beautiful.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/create">
              <Button size="lg" className="shadow-md cursor-pointer hover:scale-105 transition-all transform-gpu antialiased">Write a Post</Button>
            </Link>
          <GithubButton/>  
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary/60" />
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
        </div>
        <p className="mb-8 text-sm text-muted-foreground">
          Latest thoughts from the community
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <Loader />
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No recent posts to display.
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className="transition-all hover:shadow-md flex flex-col h-full cursor-pointer hover:-translate-y-1 transform-gpu">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post?.title || 'Untitled'}</CardTitle>
                  <CardDescription className="flex items-center gap-3">
                    <Avatar className="h-6 w-6 ring-2 ring-primary/20">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {post?.author?.username?.charAt(0).toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    {post?.author?.username || 'Unknown'}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />{' '}
                      {post?.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }) : 'Unknown date'}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post?.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
