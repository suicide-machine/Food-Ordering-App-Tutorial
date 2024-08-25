import express from "express"
import { jwtCheck, jwtDecode } from "../middleware/auth"
import {
  createMyRestaurant,
  getMyRestaurant,
  getMyRestaurantOrders,
  updateMyRestaurant,
  updateOrderStatus,
} from "../controller/myRestaurant.controller"
import multer from "multer"
import { validateMyRestaurantRequest } from "../middleware/validation"

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtDecode,
  createMyRestaurant
)

router.get("/", jwtCheck, jwtDecode, getMyRestaurant)

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtDecode,
  updateMyRestaurant
)

router.get("/order", jwtCheck, jwtDecode, getMyRestaurantOrders)

router.patch("/order/:orderId/status", jwtCheck, jwtDecode, updateOrderStatus)

export default router
