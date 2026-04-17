import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/authContext"

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link to="/" className="mr-6 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
            P
          </span>
          <span className="font-bold text-lg tracking-tight">Postr</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold transition-colors hover:bg-primary/90"
              >
                {user?.username?.charAt(0).toUpperCase()}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-10 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      navigate("/dashboard?edit=username")
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors hover:bg-accent"
                  >
                    Edit Username
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      navigate("/dashboard?edit=email")
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors hover:bg-accent"
                  >
                    Edit Email
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      handleLogout()
                    }}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-sm text-destructive transition-colors hover:bg-accent"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
