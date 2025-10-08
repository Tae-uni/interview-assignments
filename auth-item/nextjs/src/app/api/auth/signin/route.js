
import { generateToken } from "@/lib/auth";
import { users, userSchema } from "@/lib/db";
import { comparePassword } from "@/lib/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "email and password are required." },
                { status: 400 },
            )
        }

        const validData = userSchema.parse({ email, password });

        const existingUser = users.find(u => u.email === validData.email);
        if (!existingUser) {
            return NextResponse.json(
                { message: "This account is not exist" },
                { status: 401 },
            )
        }

        const isMatch = await comparePassword(validData.password, existingUser.password)
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const token = generateToken({ id: existingUser.id, email: existingUser.email });

        return NextResponse.json(
            {
                message: "Login successfully!",
                token,
                existingUser: { id: existingUser.id, email: existingUser.email },
            },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 },
        )
    }
}