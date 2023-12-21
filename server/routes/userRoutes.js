const { register ,login, allusers } = require("../model/controllers/userController")


const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)

router.get("/allusers/:id",allusers)

module.exports = router