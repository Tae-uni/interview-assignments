import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Put the email and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log({ email, password });
            if (!res.ok) {
                throw new Error("Failed login");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            navigate("/items");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleLogin} className="form-container">
                <h2 className="form-title">Login</h2>
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
                <button type="submit" className="submit-btn">
                    SignIn
                </button>
            </form>
        </div>
    )
}