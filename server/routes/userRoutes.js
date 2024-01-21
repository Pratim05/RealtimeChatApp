const { register ,login, allusers,editprofile, resetpass, forgetpass, sendEmailOtp, verifyEmailOtp } = require("../model/controllers/userController")


const router = require("express").Router()

router.post("/register",register)
router.post("/sendotp",sendEmailOtp)
router.post("/verifyotp",verifyEmailOtp)

router.post("/login",login)
router.post("/editprofile",editprofile)
router.post("/forgetpass",forgetpass)

router.post("/resetpass/:id/:token",resetpass)

router.get("/allusers/:id",allusers)


module.exports = router