"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please put email and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Failed login");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            alert("Successfully logged in")
            // router.push("/items");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col justify-center items-center p-20">
                <h1 className="text-2xl text-green-800 mb-10">Log in</h1>
                <div className="flex flex-col mb-5 w-60">
                    <label className="text-xl mb-2" htmlFor="email">Email</label>
                    <input
                        className="text-sm border border-gray-300 px-1"
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-10 w-60">
                    <label className="text-xl mb-2" htmlFor="password">Password</label>
                    <input
                        className="text-sm border border-gray-300 px-1"
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="border border-none p-1 w-35 bg-green-400 text-white rounded">
                    Log In
                </button>
            </div>
        </form>
    )
}