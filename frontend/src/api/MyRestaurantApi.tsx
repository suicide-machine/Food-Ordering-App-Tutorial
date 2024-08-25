import { Order, Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"
import { any } from "zod"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json()
  }

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  )

  return { restaurant, isLoading }
}

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyRestaurant = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    return response.json()
  }

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurant)

  if (isSuccess) {
    toast.success("Restaurant created successfully")
  }

  if (error) {
    toast.error("Unable to create restaurant")
  }

  return { createRestaurant, isLoading }
}

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    return response.json()
  }

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest)

  if (isSuccess) {
    toast.success("Restaurant Updated Successfully")
  }

  if (error) {
    toast.error("Unable to update restaurant")
  }

  return { updateRestaurant, isLoading }
}

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch orders")
    }

    return response.json()
  }

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  )

  return { orders, isLoading }
}

type UpdateOrderStatusRequest = {
  orderId: string
  status: string
}

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantOrder = async (
    updateOrderStatusRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(
      `${BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateOrderStatusRequest.status }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update status")
    }

    return response.json()
  }

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder)

  if (isSuccess) {
    toast.success("Order status updated successfully!")
  }

  if (isError) {
    toast.error("Unable to update order")
    reset()
  }

  return { updateRestaurantStatus, isLoading }
}
