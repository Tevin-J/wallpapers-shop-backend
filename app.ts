import express from 'express';
// @ts-ignore
import cors from 'cors';
import { photos } from './routes/Photos';
import { promo } from './routes/Promo';
import { purchase } from './routes/Purchase';
import { orders } from './routes/Orders';

export const app = express();

// this is a middleware functions with no mount path. functions are executed every time the app receives a request
app.use(cors());
app.use(express.json());

// mount routers on the app
app.use('/orders', orders);
app.use('/photos', photos);
app.use('/promo', promo);
app.use('/purchase', purchase);

app.get('/test', (req, res) => res.send('hello'));
