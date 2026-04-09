import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Pencil } from "lucide-react"

const CreatePost = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Pencil className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Create a Post</CardTitle>
              <CardDescription>Share your thoughts with the community</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            navigate("/feed")
          }}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="An interesting topic..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post here..."
                rows={10}
              />
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            <Button type="submit" className="shadow-sm">Publish</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/feed")}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default CreatePost
