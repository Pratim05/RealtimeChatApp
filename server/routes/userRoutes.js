const { register } = require("../model/controllers/userController")


const router = require("express").Router()

router.post("/register",register)

module.exports = router