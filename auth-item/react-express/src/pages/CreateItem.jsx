import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function CreateItemPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Name is required");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to create an item");
                return;
            }

            const res = await fetch("http://localhost:3000/items", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description })
            });
            if (!res.ok) throw new Error("Failed to create item");

            const data = await res.json();
            console.log("Item created:", data);

        } catch (error) {
            console.error(error.message);
        }
    }
    const goBack = async () => {
        navigate("/items");
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleCreate} className="form-container">
                <h1>Create Item</h1>
                <input
                    type="text"
                    placeholder="Item name"
                    className="form-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="description(optional)"
                    className="form-des"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="submit-btn">
                    Create
                </button>
                <button type="button" onClick={goBack} className="cancel-btn">
                    Cancel
                </button>
            </form>
        </div>
    )
}