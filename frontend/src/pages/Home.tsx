import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Pencil } from "lucide-react"
import GithubButton from "@/components/githubstar"


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
              <Button size="lg" className="shadow-md cursor-pointer hover:scale-105 transition-all transform-gpu antialiased">Write a Post</Button>
            </Link>
          <GithubButton/>  
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

        </div>
      </section>
    </div>
  )
}

export default Home
