import { Router } from "express";
import { AddItemToCart,GetCartItemById,UpdateCartItem,ClearCartByUserId,GetAllCartItems,GetCartItemsByUserId,DeleteCartItem, } from "../controllers/cart.controller";

const routerCart = Router();
routerCart.post("/cart/items/", AddItemToCart);
routerCart.get("/cart/items/", GetAllCartItems);
routerCart.get("/cart/items/user/:userId", GetCartItemsByUserId);
routerCart.get("/cart/items/:id", GetCartItemById);
routerCart.put("/cart/items/:id", UpdateCartItem);
routerCart.delete("/cart/items/:id", DeleteCartItem);
routerCart.delete("/cart/clear/:userId", ClearCartByUserId);
export default routerCart;