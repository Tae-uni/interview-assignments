import { users, userSchema } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { v4 as uuid4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // const { email, password } = req.body;
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "email and password are required" },
                { status: 400 }
            );
        }

        const validData = userSchema.parse({ email, password });
        const hashedPassword = await hashPassword(password);

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 409 }
            );
        }

        const newUser = {
            id: uuid4(),
            email: validData.email,
            password: hashedPassword,
        }
        users.push(newUser);

        // return res.status(200).json({
        //     message: "User registered successfully.",
        //     user: newUser,
        // })
        
        return NextResponse.json(
            { message: "User registered successfully.", user: newUser },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 },
        );
    }
}