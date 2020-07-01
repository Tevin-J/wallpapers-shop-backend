import { Request, Response } from 'express';

// задержку 2 сек надо делать на фронте, чтоб не прерывать работу nodejs!!!

export async function getPurchaseStatus(req: Request, res: Response) {
  try {
    setTimeout(() => {
      res.send(Math.round(Math.random()));
    }, 2000);
  } catch (e) {
    console.log(e);
  }
}
