import { Request, Response, Router } from 'express';

const orderController = require('../controllers/Order');

export const orders = Router();

orders.post('/', orderController.createOrder);
