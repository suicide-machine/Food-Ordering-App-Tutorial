import { MenuItem as RestaurantMenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  menuItem: RestaurantMenuItem
  addToCart: () => void
}

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="font-bold">₹{menuItem.price}</CardContent>
    </Card>
  )
}

export default MenuItem
