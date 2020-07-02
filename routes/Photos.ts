import { Router } from 'express';
import { getPhotos, searchPhotosByTitle, searchPhotosByParams } from '../controllers/Photos';

export const photos = Router();

photos.get('/', getPhotos);
photos.get('/search_by_title', searchPhotosByTitle);
photos.get('/search_by_params', searchPhotosByParams);
