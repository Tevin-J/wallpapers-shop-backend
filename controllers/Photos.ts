import { Request, Response } from 'express';
import { get } from 'request';

const baseUrl = 'https://api.unsplash.com/';
let clientIdValue: string;

function getDesiredProps(photos: any) {
  photos.log
  // @ts-ignore
  return photos.map(({ id, description, urls, likes }) => (
    { id, description, urlSmall: urls.small, urlRegular: urls.regular, price: likes }
  ));
}

function filterByPrice(photos: any, priceValue: number) {
  // @ts-ignore
  return photos.filter(({ price }) => price <= priceValue);
}

// get list of photos from unsplash
export async function getPhotos(req: Request, res: Response) {
  try {
    let page = !req.query.page ? 1 : +req.query.page;
    let perPage = !req.query.perPage ? 30 : +req.query.perPage;
    clientIdValue = String(req.query.clientId);
    get('photos',
      { baseUrl, qs: { page, client_id: clientIdValue, per_page: perPage } },
      (err: any, response: any, body: any) => {
        let photos = getDesiredProps(JSON.parse(body));
        if (err) return res.status(500).send({ message: err });
        res.json(JSON.stringify(photos));
      });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
}

// search photos by title
export async function searchPhotosByTitle(req: Request, res: Response) {
  try {
    let query = req.query.term;
    let page = !req.query.page ? 1 : +req.query.page;
    let perPage = !req.query.perPage ? 30 : +req.query.perPage;
    get('search/photos',
      { baseUrl, qs: { page, query, client_id: clientIdValue, per_page: perPage } },
      (err: any, response: any, body: any) => {
        const dbPhotos = JSON.parse(body).results;
        let photos = getDesiredProps(dbPhotos);
        if (err) return res.status(500).send({ message: err });
        res.json(JSON.stringify(photos));
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
}

// search photos by params
export async function searchPhotosByParams(req: Request, res: Response) {
  try {
    let page = !req.query.page ? 1 : +req.query.page;
    let perPage = !req.query.perPage ? 30 : +req.query.perPage;
    let color = req.query.color ? req.query.color : '';
    let orientation = req.query.orientation ? req.query.orientation : '';
    let query = req.query.term ? req.query.term : '';
    let price = Number(req.query.price);
    get(
      '/search/photos',
      { baseUrl, qs: { page, query, color, orientation, client_id: clientIdValue, per_page: perPage } },
      (err: any, response: any, body: any) => {
        const dbPhotos = JSON.parse(body).results;
        let photos = getDesiredProps(dbPhotos);
        let filteredPhotos = filterByPrice(photos, price);
        if (err) return res.status(500).send({ message: err });
        res.json(JSON.stringify(filteredPhotos));
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
}
