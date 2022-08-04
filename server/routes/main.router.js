const { Login, Register } = require("../controllers/auth.controller")

const router = require("express").Router()
router.post("/api/auth/login" , Login)
router.post("/api/auth/register" , Register)
module.exports = {
    mainRouter : router,
}