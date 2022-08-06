const {default : mongoose} = require("mongoose")
const MessageSchema = new mongoose.Schema({

        text : {type : String , required :true},
        users : Array,
        sender : {type : mongoose.Types.ObjectId , required :true , ref:"user"},

} , {
    timestamps:true
})


module.exports = {
    MessageModel : mongoose.model("message" , MessageSchema)
}