import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";
import AppDataSource from "../config/database";
const cartRepository = AppDataSource.getRepository(Cart);
const userRepository = AppDataSource.getRepository(User);
const productRepository = AppDataSource.getRepository(Product);

// MEAN: ADD ITEM TO CART
export const addItemToCart = async ( userId: string,productId: string, quantity: number): Promise<Cart> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
        throw new Error("Product not found");
    }
    const newCart = await cartRepository.create({ user,product, quantity });
    return await cartRepository.save(newCart);
};

// MEAN: GET ALL CART ITEMS
export const getAllCartItems = async (): Promise<Cart[]> => {
    return await cartRepository.find({ relations: ["user"] });
};

// MEAN: DELETE CART ITEM
export const deleteCartItem = async (id: string): Promise<boolean> => {
    const result = await cartRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE CART ITEM
export const updateCartItem = async (id: string, updateData: Partial<Cart>): Promise<Cart | null> => {
    const cartItem = await cartRepository.findOne({ where: { id } });
    if (!cartItem) {
        return null;
    }
    Object.assign(cartItem, updateData);
    return await cartRepository.save(cartItem);
};
// MEAN: GET CART ITEM BY ID
export const getCartItemById = async (id: string): Promise<Cart | null> => {
    return await cartRepository.findOne({ where: { id }, relations: ["user"] });
};

// MEAN: GET CART ITEMS BY USER ID
export const getCartItemsByUserId = async (userId: string): Promise<Cart[]> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    return await cartRepository.find({ where: { user:{id: userId} }, relations: ["user"] });
};

// MEAN: CLEAR CART BY USER ID
export const clearCartByUserId = async (userId: string): Promise<boolean> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    const result = await cartRepository.delete({ user });
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

