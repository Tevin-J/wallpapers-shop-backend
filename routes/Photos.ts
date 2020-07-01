import { Router } from 'express';
import { getPhotos } from '../controllers/Photos';

export const photos = Router();

photos.get('/', getPhotos);
