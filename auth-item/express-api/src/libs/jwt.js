import jwt from "jsonwebtoken";

const SECRET_KEY = "this_is_secret_key_for_test_kdjafidjod"

export function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return console.error("verify error");
    }
}