const { addMessage, getAllMessage, getAllNotifications, removeNotification, clearChat } = require("../model/controllers/messagesController")



const router = require("express").Router()

router.post("/addmsg",addMessage)
router.post("/getmsg",getAllMessage)
router.post("/getntf",getAllNotifications)
router.post("/setread",removeNotification)
router.post("/clearchat",clearChat)


module.exports = router