import { Router } from 'express';
import { applyPromo, createNewPromo } from '../controllers/Promo';

export const promo = Router();

promo.post('/create', createNewPromo);
promo.post('/apply', applyPromo);
