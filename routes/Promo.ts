import { Request, Response, Router } from 'express';
import { Promo } from '../models/Promo';

export const promo = Router();
const promoController = require('../controllers/Promo');

promo.get('/', promoController.getPromo);

promo.put('/promo', promoController.setNewPromo);
