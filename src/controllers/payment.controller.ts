import { Request,Response } from "express";
import { createPayment, getAllPayments, getPaymentById } from "../services/payment.service";


// MEAN: Create a new payment
export const createPaymentController = async (req: Request, res: Response) => {
    const paymentData = req.body;
    const newPayment = await createPayment(paymentData);
    res.status(201).json(newPayment);
};

// MEAN: Get all payments
export const getAllPaymentsController = async (req: Request, res: Response) => {
    const payments = await getAllPayments();
    res.status(200).json(payments);
};

// MEAN: Get a payment by ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
    const paymentId = req.params.id;
    const payment = await getPaymentById(paymentId);
    if (payment) {
        res.status(200).json(payment);
    } else {
        res.status(404).json({ message: "Payment not found" });
    }
};