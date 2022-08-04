require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const { default: helmet } = require("helmet")
const morgan = require("morgan")
const mainRouter = require("./routes/main.router")
const app = express()
app.use(helmet())
app.use(cors({
    allowedHeaders : ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("resources"))
app.use(mainRouter.mainRouter);
app.use((req,res,next) => {
    next({message : "Route not found" , status :404})
})
app.use((error ,req,res,next) => {
    console.log(error);
    const message = error.message || "Something went wrong"
    const status = error.status || 500
    res.status(status).json({message})
})
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result => {
    console.log("Connected to MongoDB")
}).catch(error => {
    console.log(error)
})
const server = app.listen(process.env.PORT , (err) => {
    if(err) console.error(err.message)
    console.log(`Server is running on port ${process.env.PORT}`)
})