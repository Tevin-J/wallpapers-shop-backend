// @ts-ignore
import * as request from 'request';
import { Request, Response } from 'express';

// нужно сделать функции по фильтрации и поиску фотографий, используя api unsplash

// посмотреть unsplash-typescript, чтоб разобраться какие есть параметры и какие у них типы

// параметры запроса необходимо передавать с фронта

let page = 1;
const perPage = 30;

export async function getPhotos(req: Request, res: Response) {
  try {
    request(`
            https://api.unsplash.com/photos/
            ?client_id=Z2U-DGy55aYJGgH-2m8y7mNMlwXSEXw0tWsxs4k-snM
            &page=${page}&per_page=${perPage}`,
      (err: any, response: any, body: any) => {
        ++page;
        if (err) return res.status(500).send({ message: err });
        res.send(body);
      });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
}
