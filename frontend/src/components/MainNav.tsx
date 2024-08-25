import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UserOptions from "./UserOptions"
import { Link } from "react-router-dom"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-red-500">
            Order Status
          </Link>

          <UserOptions />
        </>
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  )
}

export default MainNav
