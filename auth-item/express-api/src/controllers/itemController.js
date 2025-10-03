import { items, itemSchema } from "../models/itemModel.js";

export async function createItem(req, res) {
    const { name, description } = req.body;
    const user = req.user;

    const validData = itemSchema.parse({ name, description });
    
    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        ...validData,
        userId: user.id
    };

    items.push(newItem);
    res.status(201).json(newItem);
}

export async function getItem(req, res) {
    try {
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Server error occurs" });
    }
}

export async function modifyItem(req, res) {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    const user = req.user;

    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
    }

    const itemIndex = items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found" });
    }

    const item = items[itemIndex];

    if (item.userId !== user.id) {
        return res.status(403).json({ message: "You are not allowed to modify this item" });
    }

    const validData = itemSchema.parse({ name, description });

    const updatedItem = {
        ...item,
        ...validData
    };

    items[itemIndex] = updatedItem;

    return res.status(200).json(updatedItem);
}

export async function deleteItems (req, res) {
    const id = Number(req.params.id);
    const user = req.user;

    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
    }

    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found" });
    }

    const item = items[itemIndex];

    if (item.userId !== user.id) {
        return res.status(403).json({ message: "You are not allowed to delete this item" });
    }

    items.splice(itemIndex, 1);

    return res.status(200).json({ message: "Item deleted successfully" });
}