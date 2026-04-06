import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const About = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">About Postr</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A simple blogging platform built with the MERN stack where users can
        create, edit, and delete posts.
      </p>

      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold">Features</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Register, login, and manage accounts with JWT-based auth and
              token rotation.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">CRUD Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create, edit, and delete your own posts. Browse posts from other
              users on the feed.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Protected Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Only authenticated users can create or modify posts. Unauthorized
              access is blocked.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Responsive UI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with Tailwind CSS and shadcn/ui for a clean, mobile-friendly
              experience.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold">Tech Stack</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">React</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Express.js</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">MongoDB</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Node.js</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Tailwind CSS</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">JWT</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">TypeScript</Badge>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Mongoose</Badge>
      </div>
    </div>
  )
}

export default About
