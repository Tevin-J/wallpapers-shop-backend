import { Router } from 'express';
import { createOrder } from '../controllers/Order';

export const orders = Router();

orders.post('/', createOrder);
