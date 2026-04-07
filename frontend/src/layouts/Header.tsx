import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link to="/" className="mr-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            P
          </span>
          <span className="font-bold">Postr</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link to="/login">
            <span className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Log in
            </span>
          </Link>
          <Link to="/register">
            <span className="text-sm font-medium text-primary hover:underline">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
