"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please put email and password!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }
            alert("Successfully Registered!");
            router.push("/login");
        } catch (error) {
            alert("Please try again later.", error.message);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <div className="flex flex-col justify-center items-center p-20">
                <h1 className="text-2xl text-blue-400 mb-10">Register Page</h1>
                <div className="flex flex-col mb-5 w-60">
                    <label className="text-xl mb-2" htmlFor="email">Email</label>
                    <input
                        className="text-sm border border-gray-300 px-1"
                        type="email"
                        id="email"
                        placeholder="Please enter the email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10 w-60">
                    <label className="text-xl mb-2" htmlFor="password">Password</label>
                    <input
                        className="text-sm border border-gray-300 px-1"
                        type="password"
                        id="password"
                        placeholder="Please enter the password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                </div>
                <button type="submit" className="border border-none p-1 w-35 bg-blue-400 text-white rounded">
                    Sign Up
                </button>
            </div>
        </form>
    )
}