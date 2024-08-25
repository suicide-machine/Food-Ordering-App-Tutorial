import express from "express"
import { param } from "express-validator"
import {
  getRestaurant,
  searchRestaurant,
} from "../controller/restaurant.controller"

const router = express.Router()

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id parameter must be a valid string"),
  getRestaurant
)

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
)

export default router
