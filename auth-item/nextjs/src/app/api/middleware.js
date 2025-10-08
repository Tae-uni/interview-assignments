import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    if (
        pathname.startWith("/api/items") &&
        req.method !== "GET"
    ) {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        const payload = verifyToken(token);

        if (!token || !payload) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/items/:path*"],
};