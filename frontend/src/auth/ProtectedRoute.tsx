import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-3xl text-slate-600">Loading...</span>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to={"/"} replace />
}

export default ProtectedRoute
