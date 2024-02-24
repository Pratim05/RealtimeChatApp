const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const rateLimit = require('express-rate-limit')
const xss = require('xss')

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	limit: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message : "To many Requests from this IP, Try again in an hour", 	
})



const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messagesRoute.js");

const { UsersListModel } = require("./Database.js");

const app = express();
const socket = require("socket.io");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended:true,
}))
app.use(fileUpload());

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// app.use(xss())

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", async(userId) => {
    onlineUsers.set(userId, socket.id);

    // Update user's status to online
    try {
      await UsersListModel.findByIdAndUpdate(
        userId,
        { isOnline: true },
        { new: true } // To return the updated document
      );
      console.log(`User ${userId} is now online.`);
      io.emit('userStatusChanged', {OnlineUsers : Array.from(onlineUsers.keys())});
      console.log('new user',onlineUsers)

    } catch (error) {
      console.error("Error updating user status:", error);
    }
  });

  socket.on("disconnect", async () => {
    // Find the user ID associated with the disconnected socket
    const userId = Array.from(onlineUsers.keys()).find(
      (key) => onlineUsers.get(key) === socket.id
    );

    if (userId) {
      // Update user's status to offline
      try {
        await UsersListModel.findByIdAndUpdate(
          userId,
          { isOnline: false },
          { new: true }
        );
        console.log(`User ${userId} is now offline.`);
       
        // Remove user from onlineUsers map
       await onlineUsers.delete(userId);
       io.emit('userStatusChanged', {OnlineUsers : Array.from(onlineUsers.keys())});
       console.log(onlineUsers)

      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  });
  
  socket.on("send-msg", (data) => {
    //console.log(data)
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
      
      // console.log("recieve event emitted on the server",data);
    }
  });
});
