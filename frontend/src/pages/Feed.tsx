import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

// Placeholder posts — replace with real data from your backend
const posts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    content:
      "TypeScript adds static types to JavaScript, catching errors before they reach production. Combined with React's component model, it makes large codebases easier to maintain and refactor.",
    author: "Jane",
    date: "Apr 1, 2025",
    readTime: "5 min read",
    tag: "React",
  },
  {
    id: 2,
    title: "Building RESTful APIs with Express",
    content:
      "REST is all about resources and HTTP verbs. In this post we walk through setting up clean route handlers, middleware, and error handling in an Express API.",
    author: "Alex",
    date: "Mar 28, 2025",
    readTime: "7 min read",
    tag: "Backend",
  },
  {
    id: 3,
    title: "Why Tailwind CSS Changed My Workflow",
    content:
      "Utility-first CSS lets you build designs directly in your markup without context-switching to separate stylesheets. Tailwind makes it fast and consistent.",
    author: "Sam",
    date: "Mar 22, 2025",
    readTime: "4 min read",
    tag: "CSS",
  },
]

const Feed = () => {
  const loading = false

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
        {posts.map((post) => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <Badge variant="outline" className="mb-2 w-fit bg-accent/50">
                {post.tag}
              </Badge>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-3">
                <Avatar className="h-6 w-6 ring-2 ring-primary/20">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {post.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {post.author}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter className="justify-between text-xs text-muted-foreground">
              <span>{post.date}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Pencil className="mr-1 h-3 w-3" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-1 h-3 w-3" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Feed
