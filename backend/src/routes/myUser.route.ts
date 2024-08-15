import express from "express"
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controller/myUser.controller"
import { jwtCheck, jwtDecode } from "../middleware/auth"
import { validateMyUserRequest } from "../middleware/validation"

const router = express.Router()

router.get("/", jwtCheck, jwtDecode, getCurrentUser)

router.post("/", jwtCheck, createCurrentUser)

router.put("/", jwtCheck, jwtDecode, validateMyUserRequest, updateCurrentUser)

export default router
