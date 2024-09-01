import asyncErrors from "../middlewares/asyncError.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import userModel from "../models/user.model.js";
import { appointmentModel } from "../models/appointment.model.js";

export const postAppointment = asyncErrors(async (req, res, next) => {

    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doc_firstName,
        doc_lastName,
        address
    } = req.body;

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doc_firstName ||
        !doc_lastName ||
        !address
    ){
        return next(new ErrorHandler("Please Fill full Form", 400));
    }

    const doctorConflict = await userModel.find({
        firstName: doc_firstName,
        lastName: doc_lastName,
        role: "Doctor",
        docDepartment: department
    });

    if(doctorConflict.length === 0){
        return next(new ErrorHandler("Doctor not found! ", 400));
    }
    
    if(doctorConflict.length > 1){
        return next(new ErrorHandler("Doctors Data Conflict! Please Contact Through Email or Phone ", 400));
    }

    const doctorId = doctorConflict[0]._id;
    const patientId = req.user._id;
    
    const appointment = await appointmentModel.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doc: {
            firstName: doc_firstName,
            lastName: doc_lastName
        },
        address,
        doctorId,
        patientId
    });

    res.status(200).json({
        success: true,
        message: "Appointment sent successfully",
        appointment
    })
})

export const getAllAppointments = asyncErrors( async (req, res, next) => {
    
    const appointments = await appointmentModel.find();

    res.status(200).json({
        success: true,
        message: appointments
    })
});

export const updateAppointmentStatus = asyncErrors( async (req, res, next) => {
    const { id } = req.params;

    let appointment = await appointmentModel.findById(id);

    if(!appointment){
        return next(new ErrorHandler("Appointment not found. ", 404))
    }

    appointment = await appointmentModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment
    })
});

export const deleteAppointment = asyncErrors( async (req, res, next) => {
    const { id } = req.params;

    let appointment = await appointmentModel.findById(id);

    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found", 404));
    }

    await appointment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Appointment Deleted"
    })
});