import { Request, Response } from 'express';
import { Promo } from '../models/Promo';

// промокод не должен уходить на фронт!

/* когда мы вводим промокод на фронте и нажимаем на кнопку "применить промокод", это значение попадает сюда
и сравнивается с действительным значением промокода из бд. Если совпадение - возвращаем значение скидки */

/* для того, чтоб сгенерировать новый промокод, нужно прописать функцию обработки post-запроса, в которую
будем передавать значение для нового промокода и сохранять его в бд. этот post-запрос нужно делать при
помощи postman */

exports.getPromo = async (req: Request, res: Response) => {
  try {
    const promoFromDB = await Promo.findAll({ raw: true });

    if (promoFromDB[0]) {
      res.send(promoFromDB[0].title);
    } else {
      res.send(null);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.setNewPromo = async (req: Request, res: Response) => {
  try {
    const promoFromDB = await Promo.findAll({ raw: true });

    if (promoFromDB[0]) {
      const promo = await Promo.update({ title: req.body.value }, { where: { id: 1 } });
      res.send(promo);
    } else {
      const promo = await Promo.create({ title: req.query.value });
      res.send(promo);
    }
  } catch (e) {
    console.log(e);
  }
};
