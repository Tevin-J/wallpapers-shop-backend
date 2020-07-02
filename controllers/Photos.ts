// @ts-ignore
import * as request from 'request';
import { Request, Response } from 'express';

const baseUrl = 'https://api.unsplash.com/';
let clientIdValue: string;

// get list of photos from unsplash
export async function getPhotos(req: Request, res: Response) {
  try {
    let { page, perPage, clientId } = req.body;
    page = !page ? 1 : page;
    perPage = !perPage ? 30 : perPage;
    clientId = 'Z2U-DGy55aYJGgH-2m8y7mNMlwXSEXw0tWsxs4k-snM';
    clientIdValue = clientId;
    request(`${baseUrl}photos?client_id=${clientId}&page=${page}&per_page=${perPage}`,
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

// search photos by title
export async function searchPhotosByTitle(req: Request, res: Response) {
  try {
    let { query, page, perPage } = req.body;
    page = !page ? 1 : page;
    perPage = !perPage ? 30 : perPage;
    request(`${baseUrl}/search/photos?client_id=${clientIdValue}&page=${page}&per_page=${perPage}&query=${query}`,
      (err: any, response: any, body: any) => {
        ++page;
        if (err) return res.status(500).send({ message: err });
        res.send(body);
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
}

// search photos by params
export async function searchPhotosByParams(req: Request, res: Response) {
  try {
    let { page, perPage, color, orientation } = req.body;
    page = !page ? 1 : page;
    perPage = !perPage ? 30 : perPage;
    request(
      `${baseUrl}/search/photos?client_id=${clientIdValue}&page=${page}&per_page=${perPage}
      &color=${color}&orientation=${orientation}`,
      (err: any, response: any, body: any) => {
        ++page;
        if (err) return res.status(500).send({ message: err });
        res.send(body);
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
}
