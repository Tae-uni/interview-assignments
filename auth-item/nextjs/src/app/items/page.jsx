"use client";
import { useEffect, useState } from "react"

export default function ItemPage() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("/api/items");
                if (!res.ok) throw new Error("Failed to fetch items");
                const data = await res.json();
                setItems(data.items);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []);

    if (items.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center p-20">
                <h1 className="text-3xl font-bold">Item Lists</h1>
                <p className="p-10 text-lg font-bold text-red-600">No items found</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center p-20">
            <h1 className="text-3xl font-bold mb-10">Item Lists</h1>
            <ul className="font-semibold text-lg">
                {items.map((item) => (
                    <li key={item.id} className="mb-1">
                        {item.name} - {item.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}