import { Router } from "express";
import { createPaymentController, getAllPaymentsController, getPaymentByIdController } from "../controllers/payment.controller";
const routerPayment = Router();
routerPayment.post("/payments/create", createPaymentController);
routerPayment.get("/payments/", getAllPaymentsController);
routerPayment.get("/payment/:id", getPaymentByIdController);

export default routerPayment;