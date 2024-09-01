import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain more than three characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain more than 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email address"]
    },
    phone: {
        type: String,
        minLength: [11, "Phone number must contain atlease 9 characters"],
        maxLength: [11, "Phone number must contain no more than 13 characters"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Your message must contain atleast 10 characters"]
    }
})

const messageModel = mongoose.model("Message", messageSchema); 

export default messageModel;