import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, mobileNumber } = req.body;
    // const file = req.file;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 409));

    // const fileUri = getDataUri(file);
    // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    user = await User.create({
        name,
        email,
        password,
        mobileNumber,
        // images: {
        //     public_id: mycloud.public_id,
        //     url: mycloud.secure_url,
        // },
    });
    res.status(201).json({
        success: true,
        message: 'Registered Successfully',
        user,
    });
});


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, flag } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const isMatch = await user.comparePassword(password.toString());

    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Password", 401));

    if (flag === 'admin' && user.role !== "admin") {
        if (user.role !== "admin")
            return next(
                new ErrorHandler(
                    `${user.role} you are not allowed to login from here`,
                    403
                )
            );
    }

    sendToken(res, user, `Welcome back, ${user.name}`, 200);
});


export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});


export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});


export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully",
    });
});


export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
    });
});


export const updateprofilepicture = catchAsyncError(async (req, res, next) => {
    const file = req.file;

    const user = await User.findById(req.user._id);

    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile Picture Updated Successfully",
    });
});


export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    await cloudinary.uploader.destroy(user.images.public_id);
    await User.deleteOne({ _id: req.user._id });

    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "User Deleted Successfully",
        });
});

export const adminRegister = catchAsyncError(async (req, res, next) => {
    const { name, email, password, mobileNumber } = req.body;
    // const file = req.file;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 409));

    // const fileUri = getDataUri(file);
    // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    user = await User.create({
        name,
        email,
        password,
        mobileNumber,
        role: "admin",
        // images: {
        //     public_id: mycloud.public_id,
        //     url: mycloud.secure_url,
        // },
    });

    res.status(201).json({
        success: true,
        message: 'Admin Registered Successfully',
        user,
    });
});

