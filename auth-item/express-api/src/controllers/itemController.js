import { v4 as uuidv4 } from "uuid";
import { items, itemSchema } from "../models/itemModel.js";

export async function createItem(req, res) {
    try {
        const { name, description } = req.body;
        const user = req.user;

        const validData = itemSchema.parse({ name, description });

        const newItem = {
            id: uuidv4(),
            ...validData,
            userId: user.id
        };

        items.push(newItem);
        res.status(201).json({
            success: true,
            newItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export async function getItem(req, res) {
    return res.status(200).json({
        success: true,
        items
    });
}

export async function modifyItem(req, res) {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            });
        }

        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        const item = items[itemIndex];

        if (item.userId !== user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this item"
            });
        }

        const validData = itemSchema.parse({ name, description });

        const updatedItem = {
            ...item,
            ...validData
        };

        items[itemIndex] = updatedItem;

        return res.status(200).json({
            success: true,
            updatedItem
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export async function deleteItems(req, res) {
    try {
        const id = req.params.id;
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            });
        }

        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        const item = items[itemIndex];

        if (item.userId !== user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this item"
            });
        }

        items.splice(itemIndex, 1);

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}