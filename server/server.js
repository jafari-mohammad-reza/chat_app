require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {default: mongoose} = require("mongoose")
const {default: helmet} = require("helmet")
const morgan = require("morgan")
const socket = require("socket.io")
const mainRouter = require("./routes/main.router")
const app = express()
app.use(helmet())
app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("resources"))
app.use(mainRouter.mainRouter);
app.use((req, res, next) => {
    next({message: "Route not found", status: 404})
})
app.use((error, req, res, next) => {
    console.log(error);
    const message = error.message || "Something went wrong"
    const status = error.status || 500
    res.status(status).json({message})
})
mongoose.connect(process.env.MONGO_URL,
    {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
const server = app.listen(process.env.PORT, (err) => {
    if (err) console.error(err.message)
    console.log(`Server is running on port ${process.env.PORT}`)
})

const IO = socket(server,{
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: true
    }
})


//Socket Io setup

global.onlineUsers = new Map()
IO.on("connection" , (socket) => {
    global.chatSocket = socket
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId , socket.id)
    });
    socket.on("send-message" , (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.message)
        }
    })
})