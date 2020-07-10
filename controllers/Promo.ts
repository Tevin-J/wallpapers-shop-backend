import { Request, Response } from 'express';
import { Promo } from '../models/Promo';

// create new promo via postman
export async function createNewPromo(req: Request, res: Response) {
  try {
    console.log(req.body);
    const { promo, discount } = req.body;

    await Promo.create({ discount, title: promo });
    const promocode = await Promo.findAll();
    res.send(promocode);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

// get promo value from front, find promo in db with this title, and send to front discount value of this promo
export async function applyPromo(req: Request, res: Response) {
  try {
    const { promo } = req.body;
    console.log(promo);

    const correctPromo: Promo | null = await Promo.findOne({ where: { title: promo } });
    if (correctPromo) {
      res.json(1 - correctPromo.discount / 100);
    } else {
      res.json(1);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}
