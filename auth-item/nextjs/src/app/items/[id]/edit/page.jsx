"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`/api/items/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message)
                }
                setName(data.item.name);
                setDescription(data.item.description);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchItems();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!name) {
            throw new Error("Name is required");
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert("Item updated!");
            router.push("/items");
        } catch (error) {
            alert(error.message);
        }
    }

    const handleDelete = async (e) => {
        if (!confirm("Want to delete this item?")) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/items/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) router.push("/items");
    }

    if (loading) return <div>Loading...</div>
    if (!name) return <div>Item does not exist.</div>

    return (
        <form onSubmit={handleEdit}>
            <div className="flex flex-col justify-center items-center p-20">
                <h1 className="text-2xl text-red-700 mb-20">Edit Item</h1>
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
                <div className="flex">
                    <button
                        type="submit"
                        className="bg-blue-400 w-30 mr-2 mt-10 px-10 py-2 border border-none rounded text-white"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-400 w-30 mt-10 px-10 py-2 border border-none rounded text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </form>
    )
}