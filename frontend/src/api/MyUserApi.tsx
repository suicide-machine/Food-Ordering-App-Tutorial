import { User } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const BASE_URL = import.meta.env.VITE_BASE_URL

type CreateUserRequest = {
  auth0Id: string
  email: string
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    // console.log(accessToken)

    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error("Fail to create user")
    }
  }

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest)

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  }
}

type UpdateMyUserRequest = {
  name: string
  address: string
  city: string
  country: string
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Fail to update user")
    }

    return response.json()
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest)

  if (isSuccess) {
    toast.success("User updated successfully")
  }

  if (error) {
    toast.error(error.toString())
    reset()
  }

  return { updateUser, isLoading }
}

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Fail to fetch user")
    }

    return response.json()
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest)

  if (error) {
    toast.error(error.toString())
  }

  return { currentUser, isLoading }
}
