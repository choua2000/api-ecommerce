import { Router } from "express";
import { 
    CreateOrder,
    GetAllOrders,
    GetOrderById,
    GetOrderItemsByOrderId,
    UpdateOrder,
    UpdateOrderStatus,
    DeleteOrder,
    GetOrdersByUserId,
    GetOrdersByStatus,
    GetAverageOrderValue,
    GetCompletedOrders,
    GetPendingOrders,
    GetMostOrderedProducts,
    GetTotalSales,
    GetOrdersWithinDateRange,



} from "../controllers/order.controller";

const routerOrder = Router();
routerOrder.post("/orders/", CreateOrder);
routerOrder.get("/orders/", GetAllOrders);
routerOrder.get("/orders/by-id/:id", GetOrderById);
routerOrder.get("/orders/user/:userId", GetOrdersByUserId);
routerOrder.get("/orders/status/:status", GetOrdersByStatus);
routerOrder.get("/orders/average-order-value", GetAverageOrderValue);
routerOrder.get("/orders/status/completed-orders/:status", GetCompletedOrders);
routerOrder.get("/orders/status/pending-order/:status", GetPendingOrders);
routerOrder.get("/orders/most-ordered-products", GetMostOrderedProducts);
routerOrder.get("/orders/total-sales", GetTotalSales);
routerOrder.get("/orders/orders-within-date-range", GetOrdersWithinDateRange);
routerOrder.get("/orders/:orderId/order-items", GetOrderItemsByOrderId);
routerOrder.put("/orders/:id", UpdateOrder);
routerOrder.put("/orders/:id/status", UpdateOrderStatus);
routerOrder.delete("/orders/:id", DeleteOrder);

export default routerOrder;