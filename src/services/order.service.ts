import { Order } from "../entities/order.entity";
import { Between } from "typeorm";
import { User } from "../entities/user.entity";
import AppDataSource from "../config/database";
import { OrderItem } from '../entities/orderItem.entity';
const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);
const orderItemRepository = AppDataSource.getRepository(OrderItem);

// MEAN: GET ALL ORDERS
export const getAllOrders = async (): Promise<Order[]> => {
  return await orderRepository.find({ relations: ["user", "orderItems"] });
};

// MEAN: CREATE ORDER
export const createOrder = async (userId: string, totalAmount: number,status: string): Promise<Order> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }


  const newOrder = await orderRepository.create({ user, totalAmount, status });
  return await orderRepository.save(newOrder);
};

//MEAN: DELETE ORDER
export const deleteOrder = async (id: string): Promise<boolean> => {
  const result = await orderRepository.delete(id);
  if (result.affected && result.affected > 0) {
    return true;
  }
  return false;
};

// MEAN: UPDATE ORDER
export const updateOrder = async (id: string, updateData: Partial<Order>): Promise<Order | null> => {
  const order = await orderRepository.findOne({ where: { id } });
  if (!order) {
    return null;
  }
  Object.assign(order, updateData);
  return await orderRepository.save(order);
};

// MEAN: GET ORDER BY ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  return await orderRepository.findOne({ where: { id }, relations: ["user", "orderItems"] });
};

// MEAN: GET ORDERS BY USER ID
export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  return await orderRepository.find({ where: { user: { id: userId } }, relations: ["user", "orderItems"] });
};

// MEAN: GET ORDER ITEMS BY ORDER ID
export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItem[]> => {
  return await orderItemRepository.find({ where: { order: { id: orderId } }, relations: ["order", "product"] });
};

// MEAN: UPDATE ORDER STATUS
export const updateOrderStatus = async (id: string, status: string): Promise<Order | null> => {
  const order = await orderRepository.findOne({ where: { id } });
  if (!order) {
    return null;
  }
  order.status = status;
  return await orderRepository.save(order);
};

// MEAN: GET ORDERS BY STATUS
export const getOrdersByStatus = async (status: string): Promise<Order[]> => {
  return await orderRepository.find({ where: { status }, relations: ["user", "orderItems"] });
};

// MEAN: GET TOTAL SALES
export const getTotalSales = async (): Promise<number> => {
  const orders = await orderRepository.find();
  return orders.reduce((total, order) => total + order.totalAmount, 0);
};

// MEAN: GET ORDERS WITHIN DATE RANGE
export const getOrdersWithinDateRange = async (startDate: Date, endDate: Date): Promise<Order[]> => {
  return await orderRepository.find({ where: { createdAt: Between(startDate, endDate) }, relations: ["user", "orderItems"] });
};


// MEAN: GET AVERAGE ORDER VALUE
export const getAverageOrderValue = async (): Promise<number> => {
  const orders = await orderRepository.find();
  const totalSales = orders.reduce((total, order) => total + order.totalAmount, 0);
  return totalSales / orders.length;
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

// MEAN: GET ORDER COUNT BY USER
export const getOrderCountByUser = async (userId: string): Promise<number> => {
  return await orderRepository.count({ where: { user: { id: userId } } });
};

// MEAN: GET PENDING ORDERS
export const getPendingOrders = async (): Promise<Order[]> => {
  return await orderRepository.find({ where: { status: 'pending' }, relations: ["user", "orderItems"] });
};

// MEAN: GET COMPLETED ORDERS
export const getCompletedOrders = async (): Promise<Order[]> => {
  return await orderRepository.find({ where: { status: 'completed' }, relations: ["user", "orderItems"] });
};

