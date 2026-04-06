import { Button } from "@/components/ui/button"
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
import { Link } from "react-router-dom"
import { Pencil, Clock } from "lucide-react"

const samplePosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt:
      "Learn how to set up a React project with TypeScript and why it's a great choice for modern web development.",
    author: "Jane",
    date: "Apr 1, 2025",
    readTime: "5 min read",
    tag: "React",
  },
  {
    id: 2,
    title: "Building RESTful APIs with Express",
    excerpt:
      "A quick guide to designing clean, RESTful API endpoints using Express.js and best practices.",
    author: "Alex",
    date: "Mar 28, 2025",
    readTime: "7 min read",
    tag: "Backend",
  },
  {
    id: 3,
    title: "Why Tailwind CSS Changed My Workflow",
    excerpt:
      "How utility-first CSS frameworks like Tailwind can speed up your styling process and keep things consistent.",
    author: "Sam",
    date: "Mar 22, 2025",
    readTime: "4 min read",
    tag: "CSS",
  },
]

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/40">
        <div className="container mx-auto px-4 py-24 text-center">
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
              <Button size="lg" className="shadow-md">Write a Post</Button>
            </Link>
            <Link to="/feed">
              <Button variant="outline" size="lg">
                Browse Feed
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary/60" />
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
        </div>
        <p className="mb-8 text-sm text-muted-foreground">
          Latest thoughts from the community
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <Card key={post.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Badge variant="outline" className="mb-2 w-fit bg-accent/50">
                  {post.tag}
                </Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-3 pt-1">
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
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                {post.date}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
