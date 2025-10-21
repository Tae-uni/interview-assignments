"use client";
import { useState } from "react";

export default function NewPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNew = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please enter the name of item");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("You must be logged in to create an item");
            }

            const res = await fetch("/api/items", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description })
            });

            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            alert("Item created successfully!");
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleNew}>
            <div className="flex flex-col justify-center items-center p-20">
                <h1 className="text-2xl text-purple-700 mb-20">Create New Item</h1>
                <div className="flex flex-col mb-3">
                    <label htmlFor="name">Item:</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="border border-gray-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        className="border border-gray-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-400 mt-10 px-10 py-2 border border-none rounded text-white">
                    Create
                </button>
            </div>
        </form>
    )
}