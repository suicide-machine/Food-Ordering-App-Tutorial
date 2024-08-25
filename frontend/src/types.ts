export type User = {
  _id: string
  auth0Id: string
  email: string
  name: string
  address: string
  city: string
  country: string
}

export type MenuItem = {
  _id: string
  name: string
  price: string
}

export type Restaurant = {
  _id: string
  user: string
  restaurantName: string
  city: string
  country: string
  deliveryPrice: number
  estimatedDeliveryTime: number
  cuisines: string[]
  menuItems: MenuItem[]
  imageUrl: string
  lastUpdated: string
}

export type RestaurantSearchResponse = {
  data: Restaurant[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered"

export type Order = {
  _id: string
  restaurant: Restaurant
  user: User
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  deliveryDetails: {
    name: string
    address: string
    city: string
    email: string
  }
  totalAmount: number
  status: OrderStatus
  createdAt: string
  restaurantId: string
}
