import { generateToken } from "../libs/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


// ==================== REGISTER ====================

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const userByEmail = await User.findOne({
            email: normalizedEmail
        });

        if (userByEmail) {
            return res.status(400).json({
                message: "User with the same email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: normalizedEmail,
            fullName,
            password: hashedPassword
        });

        await newUser.save();

        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==================== LOGIN ====================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==================== LOGOUT ====================

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==================== CHECK AUTH ====================

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }


        return res.status(200).json({
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            },

        });

    } catch (error) {
        console.error("Check auth error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==================== DELETE ACCOUNT ====================

export const deleteAccount = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }


        await User.findByIdAndDelete(user._id);

        res.cookie("jwt", "", {
            maxAge: 0
        });

        return res.status(200).json({
            message: "Account deleted successfully"
        });

    } catch (error) {
        console.error("Delete account error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};