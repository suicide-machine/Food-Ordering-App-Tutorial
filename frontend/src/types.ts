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
