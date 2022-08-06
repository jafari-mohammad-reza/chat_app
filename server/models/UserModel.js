const {default: mongoose} = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {type: String, required: "Email is required", unique: true, max: 50},
    userName: {type: String, required: "Username is required", unique: true, min: 3, max: 20},
    password: {type: String, required: "Password is required", min: 8, max: 20},
    avatar_url: {type: String, default: '../resources/default-avatar.png'},
    isAvatarChanged: {type: Boolean, default: false},
    access_token: {type: String, default: ""},
})
const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel