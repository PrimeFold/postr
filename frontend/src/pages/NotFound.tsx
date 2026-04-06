import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Page not found
      </p>
      <Button className="mt-8" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  )
}

export default NotFound
