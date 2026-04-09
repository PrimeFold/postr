import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/authContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default ProtectedRoute