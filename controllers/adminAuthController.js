import userModel from "../models/userModel.js";
import { hashPasword, comparePassword } from "../utils/authUtils.js";
import jwt from "jsonwebtoken";

// User Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"invalid mail format"});
        }
        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login",
            });
        }
        if(password.length<6){
            return res.status(400).json({
                success: false,
                message: "password must be greater then 6 letter",
            });
        }
        // Hash password & create user
        const hashedPassword = await hashPasword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            role,
            password: hashedPassword,
        }).save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in signup",
            error: error.message,
        });
        }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check user existence
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not registered, please signup",
            });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set token in HTTP-only cookie for security
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error: error.message,
        });
    }
};

// User Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in logout",
            error: error.message,
        });
    }
};


export const getUserDetail = async (req, res) => {
    try {
        // Fetch user from database using ID from token
        const user = await userModel.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getUserDetail controller",
        });
    }
};
