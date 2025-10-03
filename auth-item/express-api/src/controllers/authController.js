import { users, userSchema } from "../models/authModel.js";
import { comparePassword, hashPassword } from "../libs/hash.js";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../libs/jwt.js";

export async function signup(req, res) {
    try {
        const { email, password } = req.body;
        console.log({ email, password });

        // Check the input field
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const validData = userSchema.parse({ email, password });
        const hashedPassword = await hashPassword(validData.password)

        // Check the email duplication
        const existEmail = users.find(u => u.email === email);
        if (existEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const newUser = {
            id: uuidv4(),
            email: validData.email,
            password: hashedPassword,
        };
        users.push(newUser);

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export async function signin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const validData = userSchema.parse({ email, password });

        const existingUser = users.find(u => u.email === validData.email);
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await comparePassword(validData.password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken({ id: existingUser.id, email: existingUser.email });

        return res.status(200).json({
            message: "Login successful",
            token,
            existingUser: { id: existingUser.id, email: existingUser.email }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};