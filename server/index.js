const express  = require("express")
const cors = require("cors")


const app = express()

require("dotenv").config()

app.use(cors())
app.use(express.json())





app.listen( process.env.PORT , ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`);
})