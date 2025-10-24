import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { itemSchema, items } from "@/lib/db";

export async function GET(req, { params }) {
    const { id } = await params;
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json(
            { message: "Unauthorization" },
            { status: 401 }
        )
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        )
    }

    const item = items.find((item) => item.id === id);
    if (!item) {
        return NextResponse.json(
            { message: "Item not found" },
            { status: 404 }
        );
    }

    if (item.userId !== decoded.id) {
        return NextResponse.json(
            { message: "Forbidden: not your item" },
            { status: 403 }
        );
    }

    return NextResponse.json(
        { message: "Item fetched successfully", item },
        { status: 200 }
    );
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json(
            { message: "Unauthorization" },
            { status: 401 }
        )
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        )
    }

    try {
        const { name, description } = await req.json();
        const validData = itemSchema.parse({ name, description });

        const itemIndex = items.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            return NextResponse.json(
                { message: "Item not found" },
                { status: 404 }
            )
        }

        // Check the user
        if (items[itemIndex].userId !== decoded.id) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            )
        }

        // Update to new data
        items[itemIndex] = {
            ...items[itemIndex],
            name: validData.name,
            description: validData.description || "",
        }

        return NextResponse.json(
            { message: "Item updated sccessfully", item: items[itemIndex] },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
    );

    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        return NextResponse.json(
            { message: "Item not found" },
            { status: 404 }
        );
    }

    if (items[itemIndex].userId !== decoded.id) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const deletedItem = items.splice(itemIndex, 1)[0];
    return NextResponse.json(
        { message: "Item deleted", deletedItem },
        { status: 200 }
    );
}