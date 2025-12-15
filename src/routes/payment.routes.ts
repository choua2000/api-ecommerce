import { Router } from "express";
import { 
    createPaymentController, 
    getAllPaymentsController, 
    getPaymentByIdController,
    updatePaymentController,
    deletePaymentController
 } from "../controllers/payment.controller";
const routerPayment = Router();
routerPayment.post("/payments/create", createPaymentController);
routerPayment.get("/payments/", getAllPaymentsController);
routerPayment.get("/payment/:id", getPaymentByIdController);
routerPayment.put("/payment/:id", updatePaymentController);
routerPayment.delete("/payment/:id", deletePaymentController);

export default routerPayment;