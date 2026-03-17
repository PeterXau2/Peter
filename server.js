require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const http = require("http")
const { Server } = require("socket.io")
const helmet = require("helmet")

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())

// Static folders
app.use(express.static("public"))
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

// Routes
app.use("/api/designs", require("./routes/designs"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/portfolio", require("./routes/portfolio"))
app.use("/api/payment", require("./routes/payment"))
app.use("/api/admin", require("./routes/admin"))
app.use("/api/ai", require("./routes/ai"))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Create server
const server = http.createServer(app)

// Socket.io
const io = new Server(server,{
  cors:{origin:"*"}
})

io.on("connection",(socket)=>{
  console.log("User connected")

  socket.on("chat message",(msg)=>{
    io.emit("chat message",msg)
  })

  socket.on("disconnect",()=>{
    console.log("User disconnected")
  })
})

// Start server
const PORT = process.env.PORT || 5000

server.listen(PORT, ()=>{
  console.log("Server running on port " + PORT)
})


app.use("/api/payment", require("./routes/payment"))