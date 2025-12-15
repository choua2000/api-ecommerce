import { Request,Response } from "express";
import { 
    createPayment, 
    getAllPayments, 
    getPaymentById,
    updatePayment,
    deletePayment,
 } from "../services/payment.service";
import { error } from "console";


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

// MEAN: Update a payment by ID
export const updatePaymentController = async (req: Request, res: Response) => {
    const paymentId = req.params.id;
    const updateData = req.body;
    const updatedPayment = await updatePayment(paymentId, updateData);
    if (updatedPayment) {
        res.status(200).json(updatedPayment);
    } else {
        res.status(404).json({ message: "Payment not found" });
    }
};

// MEAN: Delete a payment by ID

export const deletePaymentController = async (req: Request, res: Response) => {
try {
    const paymentId = req.params.id;
    const deletedPayment = await deletePayment(paymentId);
    if (deletedPayment) {
        res.status(200).json({ message: "Payment deleted successfully" });
    } else {
        res.status(404).json({ message: "Payment not found" });
    }
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error", error });
}
};