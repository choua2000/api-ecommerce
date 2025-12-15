import { OrderItem } from "../entities/orderItem.entity";
import {AppDataSource} from "../config/database";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { Between } from "typeorm";


const orderItemRepository = AppDataSource.getRepository(OrderItem);
const orderRepository = AppDataSource.getRepository(Order);
const productRepository = AppDataSource.getRepository(Product);

// MEAN: GET ALL ORDER ITEMS
export const getAllOrderItems = async (): Promise<OrderItem[]> => {
    return await orderItemRepository.find({ relations: ["order", "product"] });
};

// MEAN: CREATE ORDER ITEM
export const createOrderItem = async (
    orderId: string,
    productId: string,
    quantity: number,
    price: number
): Promise<OrderItem> => {
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
        throw new Error("Order not found");
    }
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
        throw new Error("Product not found");
    }
    const newOrderItem = await orderItemRepository.create({ order, product, quantity, price });
    return await orderItemRepository.save(newOrderItem);
};

// MEAN: DELETE ORDER ITEM
export const deleteOrderItem = async (id: string): Promise<boolean> => {
    const result = await orderItemRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE ORDER ITEM
export const updateOrderItem = async (id: string, updateData: Partial<OrderItem>): Promise<OrderItem | null> => {
    const orderItem = await orderItemRepository.findOne({ where: { id } });
    if (!orderItem) {
        return null;
    }
    Object.assign(orderItem, updateData);
    return await orderItemRepository.save(orderItem);
};

// MEAN: GET ORDER ITEM BY ID
export const getOrderItemById = async (id: string): Promise<OrderItem | null> => {
    return await orderItemRepository.findOne({ where: { id }, relations: ["order", "product"] });
};

// MEAN: GET ORDER ITEMS BY ORDER ID
export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItem[]> => {
    return await orderItemRepository.find({ where: { order: { id: orderId } }, relations: ["order", "product"] });
};

// MEAN: GET ORDER ITEMS BY PRODUCT ID
export const getOrderItemsByProductId = async (productId: string): Promise<OrderItem[]> => {
    return await orderItemRepository.find({ where: { product: { id: productId } }, relations: ["order", "product"] });
};

// MEAN: GET MOST ORDERED PRODUCTS
export const getMostOrderedProducts = async (topN: number): Promise<{ productId: string; orderCount: number }[]> => {
    const orderItems = await orderItemRepository.find({ relations: ["product"] });
    const productOrderCount: { [key: string]: number } = {};
    orderItems.forEach((orderItem) => {
        if (orderItem.product) {
            productOrderCount[orderItem.product.id] = (productOrderCount[orderItem.product.id] || 0) + 1;
        }
    });
    const mostOrderedProducts = Object.entries(productOrderCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([productId, orderCount]) => ({ productId, orderCount }));
    return mostOrderedProducts;
};

// MEAN: GET TOTAL SALES AMOUNT
export const getTotalSalesAmount = async (): Promise<number> => {
    const orderItems = await orderItemRepository.find();
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// MEAN: GET AVERAGE ORDER VALUE
export const getAverageOrderValue = async (): Promise<number> => {
    const orders = await orderRepository.find({ relations: ["orderItems"] });
    const totalSales = orders.reduce((total, order) => total + order.totalAmount, 0);
    return totalSales / orders.length;
};


// MEAN: GET TOTAL QUANTITY SOLD FOR A PRODUCT
export const getTotalQuantitySoldForProduct = async (productId: string): Promise<number> => {
    const orderItems = await orderItemRepository.find({ where: { product: { id: productId } } });
    return orderItems.reduce((total, item) => total + item.quantity, 0);
};

// MEAN: GET ORDER ITEMS BY USER ID
export const getOrderItemsByUserId = async (userId: string): Promise<OrderItem[]> => {
    return await orderItemRepository.find({ where: { order: { user: { id: userId } } }, relations: ["order", "product"] });
};
// MEAN: GET TOTAL REVENUE FOR A PRODUCT
export const getTotalRevenueForProduct = async (productId: string): Promise<number> => {
    const orderItems = await orderItemRepository.find({ where: { product: { id: productId } } });
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// MEAN: GET AVERAGE QUANTITY PER ORDER ITEM
export const getAverageQuantityPerOrderItem = async (): Promise<number> => {
    const orderItems = await orderItemRepository.find();
    const totalQuantity = orderItems.reduce((total, item) => total + item.quantity, 0);
    return totalQuantity / orderItems.length;   
};

// MEAN: GET ORDER ITEMS WITH HIGH QUANTITY
export const getOrderItemsWithHighQuantity = async (minQuantity: number): Promise<OrderItem[]> => {
    return await orderItemRepository.find({ where: { quantity: Between(minQuantity, Number.MAX_SAFE_INTEGER) }, relations: ["order", "product"] });
};

