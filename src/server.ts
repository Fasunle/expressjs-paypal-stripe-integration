import express from 'express';
import paypal from '@paypal/checkout-server-sdk';
import paypalClient from './paypal.client';
import { createPaypalPayment, paypalConfirmPayment } from 'paypal.routes';

const server = express();
const PORT = Number(process.env.NODE_PORT) || 5000;
// parse request json payload
server.use(express.json());

server.get('/', (req, res) => res.end('Hello Wolrd!'));

// paypal
server.post('/paypal/create-order', createPaypalPayment);
server.post('/paypal/confirm', paypalConfirmPayment);

// stripe

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
