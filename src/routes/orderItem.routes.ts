import { Router } from "express";
import { 
    CreateOrderItem,
    GetAllOrderItems,
    DeleteOrderItem,
    GetOrderItemById,
    UpdateOrderItem,
    GetOrderItemsByOrderId,
    GetOrderItemsByProductId,
    GetAverageQuantityPerOrderItem,
    GetTotalSalesAmount,
    GetAverageOrderValue,
    GetTotalQuantitySoldForProduct,
    GetOrderItemsByUserId,
    GetTotalRevenueForProduct,
    GetMostOrderedProducts


 } from "../controllers/orderItem.controller";
const routerOrderItem = Router();
routerOrderItem.post("/orderItems/", CreateOrderItem);
routerOrderItem.get("/orderItems/", GetAllOrderItems);
routerOrderItem.get("/orderItem/by-id/:id", GetOrderItemById);
routerOrderItem.delete("/orderItems/:id", DeleteOrderItem);
routerOrderItem.put("/orderItems/:id", UpdateOrderItem);
routerOrderItem.get("/orderItems/order/:orderId", GetOrderItemsByOrderId);
routerOrderItem.get("/orderItems/product/:productId", GetOrderItemsByProductId);
routerOrderItem.get("/orderItems/average-quantity", GetAverageQuantityPerOrderItem);
routerOrderItem.get("/orderItems/total-sales-amount", GetTotalSalesAmount);
routerOrderItem.get("/orderItems/average-order-value", GetAverageOrderValue);
routerOrderItem.get("/orderItems/total-quantity-sold/:productId", GetTotalQuantitySoldForProduct);
routerOrderItem.get("/orderItems/user/:userId", GetOrderItemsByUserId);
routerOrderItem.get("/orderItems/total-revenue/:productId", GetTotalRevenueForProduct);

routerOrderItem.get("/orderItems/most-ordered-products", GetMostOrderedProducts);

export default routerOrderItem;