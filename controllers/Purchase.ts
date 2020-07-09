import { Request, Response } from 'express';

// need to create a delay before making request to perform this function from front!
export async function getPurchaseStatus(req: Request, res: Response) {
  try {
    res.json(Math.round(Math.random()));
  } catch (e) {
    res.sendStatus(400).send(e.message);
  }
}
