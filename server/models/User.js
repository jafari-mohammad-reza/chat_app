const {Schema , model} = require('mongoose');
const UserSchema = new Schema({
    first_name : {type:String , required: true},
    last_name : {type:String , required: true},
    email : {type:String , required: true},
    password : {type:String , required: true},
} , {timestamps: true});

module.exports = {
    UserModel : model('user' , UserSchema)
}