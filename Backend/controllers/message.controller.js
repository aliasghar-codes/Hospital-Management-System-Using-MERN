import messageModel from "../models/message.model.js";
import asyncErrors from "../middlewares/asyncError.middleware.js";
import errorHandler from "../middlewares/error.middleware.js";

const message = asyncErrors(async (req, res, next) => {

    const {firstName, lastName, email, phone, message} = req.body;

    if(!firstName || !lastName || !email || !phone || !message){
        return next(new errorHandler("Please Fill Full Form", 400));
    }

    await messageModel.create({firstName, lastName, email, phone, message});

    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    });

})

export const getAllMessages = asyncErrors( async (req, res, next) => {
    const messages = await messageModel.find();
    res.status(200).json({
        success: true,
        message: messages
    })
})

export default message;