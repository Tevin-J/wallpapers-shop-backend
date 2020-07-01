import { Router } from 'express';
import { getPurchaseStatus } from '../controllers/Purchase';

export const purchase = Router();

purchase.get('/', getPurchaseStatus);
