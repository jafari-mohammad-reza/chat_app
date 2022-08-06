const {Login, Register, SetUserAvatar, GetAllUsers} = require("../controllers/user.controller")
const {GetAllUserMessages, AddMessage} = require("../controllers/message.controller");

const router = require("express").Router()
router.post("/api/auth/login", Login)
router.post("/api/auth/register", Register)
router.post("/api/set-avatar/:id", SetUserAvatar)
router.get("/api/users/:id", GetAllUsers)
//! messages route

router.post("/api/get-message" , GetAllUserMessages )
router.post("/api/add-message" , AddMessage)



module.exports = {
    mainRouter: router,
}