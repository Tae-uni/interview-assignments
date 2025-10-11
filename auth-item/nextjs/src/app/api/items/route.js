import { NextResponse } from "next/server";
import { itemSchema, items } from "@/lib/db";
import { v4 as uuid4 } from "uuid";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json(
            { message: "Unauthroization" },
            { status: 401 }
        )
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: "Unauthroization" },
                { status: 401 }
            )
        }

        const { name, description } = await req.json();
        const validData = itemSchema.parse({ name, description });

        if (!name) {
            return NextResponse.json(
                { message: "Item name is required." },
                { status: 400 }
            )
        }

        const newItem = {
            id: uuid4(),
            name: validData.name,
            description: validData.description || "",
            userId: decoded.id,
        };

        items.push(newItem);

        return NextResponse.json(
            { message: "Item created successfully", newItem },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Fail to create the itmes." },
            { status: 400 }
        )
    }
}

export async function GET(res) {
    try {
        return NextResponse.json(
            { items },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Fail to fetch" },
            { status: 400 }
        )
    }
}