import { Request, Response } from "express";
import {
  createOrderItem,
  getAllOrderItems,
  deleteOrderItem,
  updateOrderItem,
  getOrderItemById,
  getOrderItemsByOrderId,
  getOrderItemsByProductId,
  getAverageQuantityPerOrderItem,
  getTotalSalesAmount,
  getAverageOrderValue,
  getTotalQuantitySoldForProduct,
  getOrderItemsByUserId,
  getTotalRevenueForProduct,
  getMostOrderedProducts
 
} from "../services/orderItem.service";

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

// MEAN: CREATE ORDER ITEM
export const CreateOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, quantity, price } = req.body;
    if (!orderId || !productId || !quantity || !price) {
      return res
        .status(400)
        .json({ message: "User ID, total amount, and status are required" });
    }
    const orderItem = await createOrderItem(
      orderId,
      productId,
      quantity,
      price
    );
    return res
      .status(201)
      .json({ message: "Order created successfully", orderItem });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET ALL ORDER ITEMS
export const GetAllOrderItems = async (req: Request, res: Response) => {
  try {
    const orderItems = await getAllOrderItems();
    return res
      .status(200)
      .json({ message: "Order items fetched successfully", orderItems });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET ORDER ITEM BY ID
export const GetOrderItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderItem = await getOrderItemById(id);
    if (orderItem) {
      return res
        .status(200)
        .json({ message: "Order item fetched successfully", orderItem });
    }
    return res.status(404).json({ message: "Order item not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: DELETE ORDER ITEM
export const DeleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteOrderItem(id);
    if (result) {
      return res.status(200).json({ message: "Order item deleted successfully" });
    }
    return res.status(404).json({ message: "Order item not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: UPDATE ORDER ITEM
export const UpdateOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    const result = await updateOrderItem(id, { quantity, price });
    if (result) {
      return res
        .status(200)
        .json({ message: "Order item updated successfully", result });
    }
    return res.status(404).json({ message: "Order item not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET ORDER ITEMS BY ORDER ID
export const GetOrderItemsByOrderId = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const orderItems = await getOrderItemsByOrderId(orderId);
    return res
      .status(200)
      .json({ message: "Order items fetched successfully", orderItems });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
// MEAN: GET ORDER ITEMS BY PRODUCT ID
export const GetOrderItemsByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const orderItems = await getOrderItemsByProductId(productId);
    return res
      .status(200)
      .json({ message: "Order items fetched successfully", orderItems });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET AVERAGE QUANTITY PER ORDER ITEM
export const GetAverageQuantityPerOrderItem = async (req: Request, res: Response) => {
  try {
    const averageQuantity = await getAverageQuantityPerOrderItem();
    return res
      .status(200)
      .json({ message: "Average quantity per order item fetched successfully", averageQuantity });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET TOTAL SALES AMOUNT
export const GetTotalSalesAmount = async (req: Request, res: Response) => {
  try {
    const totalSalesAmount = await getTotalSalesAmount();
    return res
      .status(200)
      .json({ message: "Total sales amount fetched successfully", totalSalesAmount });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET AVERAGE ORDER VALUE
export const GetAverageOrderValue = async (req: Request, res: Response) => {
  try {
    const averageOrderValue = await getAverageOrderValue();
    return res
      .status(200)
      .json({ message: "Average order value fetched successfully", averageOrderValue });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET TOTAL QUANTITY SOLD FOR A PRODUCT
export const GetTotalQuantitySoldForProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const totalQuantitySold = await getTotalQuantitySoldForProduct(productId);
    return res
      .status(200)
      .json({ message: "Total quantity sold for product fetched successfully", totalQuantitySold });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET ORDER ITEMS BY USER ID
export const GetOrderItemsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderItems = await getOrderItemsByUserId(userId);
    return res
      .status(200)
      .json({ message: "Order items fetched successfully", orderItems });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET TOTAL REVENUE FOR A PRODUCT
export const GetTotalRevenueForProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const totalRevenue = await getTotalRevenueForProduct(productId);
    return res
      .status(200)
      .json({ message: "Total revenue for product fetched successfully", totalRevenue });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};




