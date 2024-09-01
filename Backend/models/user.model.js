import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "User"
    },
    docDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function (next) {

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJWT = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

const userModel = mongoose.model("User", userSchema);

export default userModel;