const {Schema , model} = require("mongoose")
const MessageSchema = new Schema({
    sender : {type:Schema.Types.ObjectId , ref:"user" , required: true},
    messageContent : {type:String , required: true},
    dateTime : {type:Date , default: Date.now}
})
const RoomSchema = new Schema({
    name : {type:String , required: true},
    description : {type:String , required: true},
    messages : {type:[MessageSchema] ,  default:[]},
    images : {type:String , required: true},
})
const ConversationSchema = new Schema({
    name : {type:String , required: true},
    users : {type:[Schema.Types.ObjectId] , ref:"user" , default:[]},
    endpoint : {type:String , required: true},
    rooms : {type:[RoomSchema]  , default:[]},
})
const ConversationModel = model("Conversation" , ConversationSchema)
module.exports = {
    ConversationModel
}