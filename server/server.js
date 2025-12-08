import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import { Server } from 'socket.io'

//create express app and http server
const app = express()
const server = http.createServer(app)

//initialze socket.io server
export const io = new Server(server, {
    cors:{origin:"*"}
})

//store online users
export const userSocketMap = {} //{userId: soketId}

//Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if (userId) userSocketMap[userId] = socket.id
    
    //emit online user to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

//middleware setup
app.use(cors());
app.use(express.json({ limit: '4mb' }))


//routes setup
app.use('/api/status', (req, res) => {
    res.send("server is live")
})
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)

//when the image is too big
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large' || err.status === 413) {
        return res
            .status(413)
            .json({ success: false, message: 'Reach the limit for pic (4MB)' });
    }
    console.log(err.message);
    res.status(500).json({ success: false, message: 'sorry something goes wrong' });
});

//connect to mongodb
await connectDB();

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log('server is runnning on PORT : ' + PORT)
})