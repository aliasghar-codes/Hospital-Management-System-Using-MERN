import asyncErrors from "../middlewares/asyncError.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "cloudinary"
import jwt from "jsonwebtoken"

const registerMember = asyncErrors( async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, avatar, role } = req.body;
    
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    };

    let user = await userModel.findOne({ email });

    if(user){
        return next(new ErrorHandler(`${user.role} already registered`, 400));
    };

    user = await userModel.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password, 
        avatar,
        role
    });

    generateToken(user, "User Registered", 200, res)
})

export const login = asyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Provide All Details.", 400));
    }

    let user = await userModel.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatch =  user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    generateToken(user, "Logged in successfully", 200, res);
})

export const getAllDoctors = asyncErrors( async (_, res) => {
    
    const doctors = await userModel.find({role: "Doctor"});

    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = asyncErrors( async (req, res) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        message: user
    })
})

export const logoutAdmin = asyncErrors(async (_, res) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin log out successfully"
    });
})

export const logoutUser = asyncErrors(async(_, res) => {
    res.status(200).cookie("userToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User log out successfully"
    })
})

export const addNewDoctor = asyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required.", 400))
    }

    const { docAvatar } = req.files; 
    
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format not supported.", 400));
    }

    const {
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password, 
        docDepartment
    } = req.body;

    if(
        !firstName || 
        !lastName || 
        !email || 
        !phone || 
        !nic || 
        !dob || 
        !gender || 
        !password ||
        !docDepartment
    ){
        return next(new ErrorHandler("Please fill full form", 400))
    }

    const isRegistered = await userModel.findOne({ email });

    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} is already registered`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error: ", cloudinaryResponse.error || "Unknown error")
    }

    const doctor = await userModel.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        password, 
        docDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        role: "Doctor"
    });

    res.status(200).json({
        success: true,
        message: doctor
    })
})

export const changeTheme = asyncErrors(async(req, res) => {
    const { mode } = req.params;
    const token = req.cookies.userToken || req.cookies.adminToken;

    if(!token){
        return res.status(200).json({ success: true });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    await userModel.findByIdAndUpdate(decodedToken.id, { theme: mode });

    return res.status(200).json({ success: true });
})

export default registerMember;