const express  = require("express")
const cors = require("cors")
const socket = require("socket.io")

const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messagesRoute.js")

const {UsersListModel} = require('./Database.js')


const app = express()

require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages",messageRoutes)





const server = app.listen( process.env.PORT , ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`);
})

const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials : true
    }
})

global.onlineUsers = new Map()

io.on("connection", (socket)=>{
    global.chatSocket = socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId , socket.id)
    })
    socket.on("send-msg",(data)=>{

        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieved", data.message)
        }
    })
})

