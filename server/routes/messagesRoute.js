const { addMessage, getAllMessage, getAllNotifications, removeNotification } = require("../model/controllers/messagesController")



const router = require("express").Router()

router.post("/addmsg",addMessage)
router.post("/getmsg",getAllMessage)
router.post("/getntf",getAllNotifications)
router.post("/setread",removeNotification)


module.exports = router