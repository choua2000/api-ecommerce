import { Request, Response } from 'express';
import {addItemToCart, getAllCartItems, deleteCartItem, updateCartItem, getCartItemById, getCartItemsByUserId, clearCartByUserId} from '../services/cart.service';
// MEAN: ADD ITEM TO CART
export const AddItemToCart = async (req: Request, res: Response) => {
    try {
        const { userId,productId,  quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "User ID, Product ID and quantity are required" });
        }
        const result = await addItemToCart(userId,productId, quantity);
        return res.status(201).json({ message: "Item added to cart successfully", result });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: GET ALL CART ITEMS
export const GetAllCartItems = async (req: Request, res: Response) => {
    try {
        const cartItems = await getAllCartItems();
        return res.status(200).json({ message: "Cart items fetched successfully", cartItems });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: DELETE CART ITEM
export const DeleteCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteCartItem(id);
        if (result) {
            return res.status(200).json({ message: "Cart item deleted successfully" });
        }
        return res.status(404).json({ message: "Cart item not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: UPDATE CART ITEM
export const UpdateCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const result = await updateCartItem(id, { quantity });
        if (result) {
            return res.status(200).json({ message: "Cart item updated successfully", result });
        }
        return res.status(404).json({ message: "Cart item not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: GET CART ITEM BY ID
export const GetCartItemById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cartItem = await getCartItemById(id);
        if (cartItem) {
            return res.status(200).json({ message: "Cart item fetched successfully", cartItem });
        }
        return res.status(404).json({ message: "Cart item not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: GET CART ITEMS BY USER ID
export const GetCartItemsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const cartItems = await getCartItemsByUserId(userId);
        return res.status(200).json({ message: "Cart items fetched successfully", cartItems });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
// MEAN: CLEAR CART BY USER ID
export const ClearCartByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await clearCartByUserId(userId);
        return res.status(200).json({ message: "Cart cleared successfully", result });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

