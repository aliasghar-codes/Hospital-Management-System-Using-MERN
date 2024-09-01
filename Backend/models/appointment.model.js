import mongoose, { trusted } from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
        unique: true,
        validate: [validator.isEmail, "Please provide valid email address"]
    },
    phone: {
        type: String,
        unique: true,
        minLength: [11, "Phone number must contain atlease 9 characters"],
        maxLength: [11, "Phone number must contain no more than 13 characters"],
    },
    nic: {
        type: String,
        minLength: [9, "Phone number must contain atlease 9 characters"],
        maxLength: [13, "Phone number must contain no more than 13 characters"],
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doc: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    },
})

export const appointmentModel = mongoose.model("Appointment", appointmentSchema);