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