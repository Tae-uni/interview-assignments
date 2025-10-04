import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("http://localhost:3000/items");
                if (!res.ok) throw new Error("Failed to fetch items");
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []);

    const onCreate = async (e) => {
        navigate("/create-item");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1>Item List</h1>
            <ul style={{ fontSize: "large", padding: "0px" }}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.id} style={{ marginBottom: "2px" }}>
                            <strong>{item.name}</strong> - {item.description} <button>Delete</button>
                        </li>
                    ))
                ): (
                    <p>No items found</p>
                )}
            </ul>
            <button onClick={onCreate} style={{ background:"blue", color: "white" }}>
                Create Item
            </button>
        </div>
    );
}