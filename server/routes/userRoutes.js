const { register ,login, allusers,editprofile } = require("../model/controllers/userController")


const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/editprofile",editprofile)

router.get("/allusers/:id",allusers)

module.exports = router