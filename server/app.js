require("dotenv").config();
const express = require("express")
const app = express()
const ExpressEjsLayouts = require("express-ejs-layouts")
const {default : mongoose} = require("mongoose")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(ExpressEjsLayouts)
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// app.set("layout", "./layouts/master");
// app.use((req, res, next) => {
//     app.locals = clientHelper(req, res);
//     next()
// })
mongoose.connect(process.env.MONGO_URL).then(r =>  {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log(err)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))