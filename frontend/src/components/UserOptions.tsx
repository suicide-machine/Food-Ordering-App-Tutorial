import { CircleUserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

const UserOptions = () => {
  const { user, logout } = useAuth0()
  //   console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2">
        <CircleUserRound className="text-red-500" />

        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to={"/manage-restaurant"}
            className="font-bold hover:text-red-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to={"/user-profile"} className="font-bold hover:text-red-500">
            User Profile
          </Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-red-500"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserOptions
