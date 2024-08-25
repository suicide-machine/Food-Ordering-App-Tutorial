import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import LoadingButton from "./LoadingButton"
import { useLocation } from "react-router-dom"
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useGetMyUser } from "@/api/MyUserApi"

type Props = {
  onCheckout: (userFromData: UserFormData) => void
  disabled: boolean
  isLoading: boolean
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0()

  const { pathname } = useLocation()

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    })
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-red-500 flex-1">
        Log in to place order
      </Button>
    )
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-green-700 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isGetUserLoading}
          onSave={onCheckout}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton
