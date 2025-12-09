import { Request, Response } from "express";
import { 
    createOrder, 
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    getOrderItemsByOrderId,
    updateOrderStatus,
    getOrdersByStatus,
    getAverageOrderValue,
    getCompletedOrders,
    getPendingOrders,
    getMostOrderedProducts,
    getTotalSales,
    getOrdersWithinDateRange


} from "../services/order.service";

// MEAN: CREATE ORDER
export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { userId, totalAmount, status } = req.body;
    if (!userId || !totalAmount || !status) {
        return res.status(400).json({ message: "User ID, total amount, and status are required" });
    }
    const newOrder = await createOrder(userId, totalAmount, status);
    return res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ALL ORDERS
export const GetAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ORDER BY ID
export const GetOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (order) {
      return res.status(200).json({ message: "Order fetched successfully", order });
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};
// MEAN: UPDATE ORDER
export const UpdateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {  totalAmount, status } = req.body;
    const result = await updateOrder(id, {  totalAmount, status });
    if (result) {
      return res.status(200).json({ message: "Order updated successfully", result });
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: DELETE ORDER
export const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteOrder(id);
    if (result) {
      return res.status(200).json({ message: "Order deleted successfully" });
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ORDERS BY USER ID
export const GetOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUserId(userId);
    return res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ORDER ITEMS BY ORDER ID
export const GetOrderItemsByOrderId = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const orderItems = await getOrderItemsByOrderId(orderId);
    return res.status(200).json({ message: "Order items fetched successfully", orderItems });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: UPDATE ORDER STATUS
export const UpdateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateOrderStatus(id, status);
    if (result) {
      return res.status(200).json({ message: "Order status updated successfully", result });
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ORDERS BY STATUS
export const GetOrdersByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const orders = await getOrdersByStatus(status);
    return res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET TOTAL SALES
export const GetTotalSales = async (req: Request, res: Response) => {
  try {
    const totalSales = await getTotalSales();
    return res.status(200).json({ message: "Total sales fetched successfully", totalSales });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET ORDERS WITHIN DATE RANGE
export const GetOrdersWithinDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "startDate and endDate are required" });
    }

    const orders = await getOrdersWithinDateRange(
      new Date(startDate as string),
      new Date(endDate as string)
    );

    return res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// MEAN: GET AVERAGE ORDER VALUE
export const GetAverageOrderValue = async (req: Request, res: Response) => {
  try {
    const averageOrderValue = await getAverageOrderValue();
    return res.status(200).json({ message: "Average order value fetched successfully", averageOrderValue });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET COMPLETED ORDERS
export const GetCompletedOrders = async (req: Request, res: Response) => {
  try {
    const completedOrders = await getCompletedOrders();
    return res.status(200).json({ message: "Completed orders fetched successfully", completedOrders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET PENDING ORDERS
export const GetPendingOrders = async (req: Request, res: Response) => {
  try {
    const pendingOrders = await getPendingOrders();
    return res.status(200).json({ message: "Pending orders fetched successfully", pendingOrders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: GET MOST ORDERED PRODUCTS
export const GetMostOrderedProducts = async (req: Request, res: Response) => {
  try {
    const mostOrderedProducts = await getMostOrderedProducts(5);
    return res.status(200).json({ message: "Most ordered products fetched successfully", mostOrderedProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

