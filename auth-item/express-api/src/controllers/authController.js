import { v4 as uuidv4 } from "uuid";
import { users, userSchema } from "../models/authModel.js";
import { comparePassword, hashPassword } from "../libs/hash.js";
import { generateToken } from "../libs/jwt.js";

export async function signup(req, res) {
    try {
        const { email, password } = req.body;

        // Check the input field
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required" 
            });
        }

        const validData = userSchema.parse({ email, password });
        const hashedPassword = await hashPassword(validData.password);

        // Check the email duplication
        const existEmail = users.find(u => u.email === email);
        if (existEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already exists" 
            });
        }

        const newUser = {
            id: uuidv4(),
            email: validData.email,
            password: hashedPassword,
        };
        users.push(newUser);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

export async function signin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required" 
            });
        }

        const validData = userSchema.parse({ email, password });

        const existingUser = users.find(u => u.email === validData.email);
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password" 
            });
        }

        const isMatch = await comparePassword(validData.password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password" 
            });
        }

        const token = generateToken({ id: existingUser.id, email: existingUser.email });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: existingUser.id, email: existingUser.email }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};