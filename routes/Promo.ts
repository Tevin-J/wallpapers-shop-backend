import { Router } from 'express';

export const promo = Router();
import { applyPromo, createNewPromo } from '../controllers/Promo';

/*promo.get('/', promoController.getPromo);

promo.put('/', promoController.setNewPromo);*/

promo.post('/create', createNewPromo);

promo.post('/apply', applyPromo);
