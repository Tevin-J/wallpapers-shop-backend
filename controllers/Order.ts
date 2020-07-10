import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Item } from '../models/Item';

export async function createOrder(req: Request, res: Response) {
  try {
    const { items, promo, cost } = req.body;
    console.log(items, promo, cost);

    // create model Order and put cost and promo properties into it
    const order: Order = await Order.create({ cost, promo });

    // map collection of items to put every item into created model Item, into pItems returns a promises
    // @ts-ignore
    const pItems = items.map(({ id, url }) => Item.create({ url, photoId: id }));

    // wait until all items will record in model and then assign result into dbItems
    const dbItems: Item[] = await Promise.all(pItems);

    // record dbItems into Order model by items key
    await order.$set('items', dbItems);
    const orders = await Order.findAll();
    res.json(JSON.stringify(orders));
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
  // try {
  //   // await Item.destroy({truncate: true});
  //   // await Order.destroy({truncate: true});
  //   res.send(await Item.findAll());
  // } catch (e) {
  //   res.status(400).send(e.message);
  // }
}
