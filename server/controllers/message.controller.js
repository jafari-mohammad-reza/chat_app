const {MessageModel} = require("../models/MessageModel");
exports.AddMessage = async(req,res,next)  => {
    try {
        const {from , to , message} = req.body;
        const data  =await MessageModel.create({text : message , users : [from , to] , sender : from}).catch(err => {throw {message : err.message , status :500}})
        if(data) {
            return res.status(201).json({
                message : "Message added successfully."
            })
        }
        return res.status(500).json({
            message : "Failed to add the message"
        })
    }
    catch (error) {
        next(error)
    }
}

exports.GetAllUserMessages = async(req,res,next)  => {
    try {
        const {from  , to} = req.body;
        const messages = await MessageModel.find({users : {$all : [from ,to]}}).sort({updatedAt :1})
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf :msg.sender.toString() === from,
                message : msg.text
            }
        })
        return res.status(200).json({
            projectedMessages
        })

    }
    catch (error) {
        next(error)
    }
}
