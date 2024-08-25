import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/myUser.route"
import myRestaurantRoute from "./routes/myRestaurant.route"
import restaurantRoute from "./routes/restaurant.route"
import orderRoute from "./routes/order.route"
import { v2 as cloudinary } from "cloudinary"

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }))

app.use(express.json())

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" })
})

app.use("/api/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.use("/api/order", orderRoute)

app.listen(5000, () => {
  console.log("Server is running on localhost: 5000")
})
