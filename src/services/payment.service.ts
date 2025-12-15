import { Payment } from '../entities/payment.entity';
import { Order } from '../entities/order.entity';
import {AppDataSource} from '../config/database';

const paymentRepository = AppDataSource.getRepository(Payment);
const orderRepository = AppDataSource.getRepository(Order);

// MEAN: Create a new payment
export const createPayment = async (paymentData: Payment): Promise<Payment> => {
    const newPayment = await paymentRepository.create(paymentData);
    return await paymentRepository.save(newPayment);
};


// MEAN: Get all payments
export const getAllPayments = async (): Promise<Payment[]> => {
    return await paymentRepository.find();
};

// MEAN: Get a payment by ID
export const getPaymentById = async (paymentId: string): Promise<Payment | null> => {
    return await paymentRepository.findOne({ where: { id: paymentId } });
};


// MEAN: Update a payment by ID
export const updatePayment = async (paymentId: string, updateData: Partial<Payment>): Promise<Payment | null> => {
    const payment = await paymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
        return null;
    }
    Object.assign(payment, updateData);
    return await paymentRepository.save(payment);
};

// MEAN: Delete a payment by ID
export const deletePayment = async (paymentId: string): Promise<Payment | null> => {
    const payment = await paymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
        return null;
    }
    return await paymentRepository.remove(payment);
};


// MEAN: Get a payment by order ID
export const getPaymentByOrderId = async (orderId: string): Promise<Payment | null> => {
    return await paymentRepository.findOne({ where: { order: { id: orderId } } });
};

// 