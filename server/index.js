const express  = require("express")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messagesRoute.js")

const {UsersListModel} = require('./Database.js')


const app = express()

require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages",messageRoutes)





app.listen( process.env.PORT , ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`);
})