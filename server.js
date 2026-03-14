require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static("public"))
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

app.use("/api/designs", require("./routes/designs"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/portfolio", require("./routes/portfolio"))
app.use("/api/payment", require("./routes/payment"))

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

const http = require("http")
const { Server } = require("socket.io")

const server = http.createServer(app)

const io = new Server(server,{
cors:{origin:"*"}
})

io.on("connection",(socket)=>{
console.log("User connected")

socket.on("chat message",(msg)=>{
io.emit("chat message",msg)
})

socket.emit("chat message",{
user:"Visitor",
message:input.value
})

socket.on("disconnect",()=>{
console.log("User disconnected")
})
})

server.listen(process.env.PORT || 3000,()=>{
console.log("Server running")
})

const helmet = require("helmet")

app.use(helmet())

const sharp = require("sharp")

await sharp(req.file.path)
.resize(800)
.toFile("uploads/optimized-"+req.file.filename)


const adminRoutes = require("./routes/admin")

app.use("/api/admin", adminRoutes)


app.use("/api/ai", require("./routes/ai"))

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
console.log("Server running on port " + PORT)
})