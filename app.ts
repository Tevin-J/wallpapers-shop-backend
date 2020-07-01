import express from 'express';
// @ts-ignore
import * as cors from 'cors';
import { photos } from './routes/Photos';
import { promo } from './routes/Promo';
import { purchase } from './routes/Purchase';
import { orders } from './routes/Orders';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/orders', orders);
app.use('/photos', photos);
app.use('/promo', promo);
app.use('/purchase', purchase);
