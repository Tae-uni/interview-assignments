import { useState } from "react";
import '../index.css';

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Put the email and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log({ email, password });
            if (!res.ok) {
                throw new Error("Failed register");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleRegister} className="form-container">
                <h2 className="form-title">Register</h2>
                {/* <div style={{ display: "flex", flexDirection: "column", marginBottom }}> */}
                <input
                    type="email"
                    className="form-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="form-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
                {/* </div> */}
                <button type="submit">
                    SignUp
                </button>
            </form>
        </div>
    )
}