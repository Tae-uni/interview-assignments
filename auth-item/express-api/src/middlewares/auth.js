import { verifyToken } from "../libs/jwt.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token required" });

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};