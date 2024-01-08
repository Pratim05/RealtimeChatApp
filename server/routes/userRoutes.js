const { register ,login, allusers,editprofile, resetpass, forgetpass } = require("../model/controllers/userController")


const router = require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/editprofile",editprofile)
router.post("/forgetpass",forgetpass)

router.post("/resetpass/:id/:token",resetpass)

router.get("/allusers/:id",allusers)


module.exports = router