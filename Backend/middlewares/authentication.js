import userModel from "../models/user.model.js";
import asyncErrors from "./asyncError.middleware.js";
import ErrorHandler from "./error.middleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = asyncErrors( async (req, res, next) => {
    const token = req.cookies.adminToken;

    if(!token){
        return next(new ErrorHandler("Admin not Authenticated", 400));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decodedToken.id);

    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403))
    }

    next();
})

export const isUserAuthenticated = asyncErrors( async (req, res, next) => {
    const token = req.cookies.userToken;

    if(!token){
        return next(new ErrorHandler("User not authenticated", 400));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await userModel.findOne({_id: decodedToken.id});

    if(req.user.role !== "User"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403))
    }

    next();
})
