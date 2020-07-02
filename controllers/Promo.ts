import { Request, Response } from 'express';
import { Promo } from '../models/Promo';

// create new promo via postman post-request
export async function createNewPromo(req: Request, res: Response) {
  try {
    const promoValue: string = req.body.promo;
    const discountValue: number = req.body.discount;

    await Promo.create({ title: promoValue, discount: discountValue });
  } catch (e) {
    res.status(400).send(e.message);
  }
}

// get promo value from front, find promo in db with this title, and send to front discount value of this promo
export async function applyPromo(req: Request, res: Response) {
  try {
    const promoValueFromFront: string = req.body.promo;

    const correctPromo: Promo | null = await Promo.findOne({ where: { title: promoValueFromFront } });
    if (correctPromo) {
      res.send(1 - correctPromo.discount / 100);
    } else {
      res.send(1);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}
