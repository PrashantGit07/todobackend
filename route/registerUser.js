import express from "express"
import RegisterUser from "../controller/userRegister.js"
import userLogin from "../controller/userLogin.js"
import LogoutUser from "../controller/LogoutUser.js"
import checkUser from "../controller/checkUser.js"

const router = express.Router()

router.post("/register", RegisterUser)

router.post("/login", userLogin)

router.post("/logout", LogoutUser)

router.post("/check-user", checkUser)
export default router