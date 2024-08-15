import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

  // console.log(currentUser)

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Failed to load current user</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
