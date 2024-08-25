import express from "express"
import { jwtCheck, jwtDecode } from "../middleware/auth"
import {
  createCheckoutSession,
  getMyOrders,
  stripeWebhookHandler,
} from "../controller/order.controller"

const router = express.Router()

router.get("/", jwtCheck, jwtDecode, getMyOrders)

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtDecode,
  createCheckoutSession
)

router.post("/checkout/webhook", stripeWebhookHandler)

export default router
