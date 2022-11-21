import express from 'express';
import { createPaypalPayment, paypalConfirmPayment } from './paypal.routes';
import { createStripePayment } from './stripe.routes';

const server = express();
const PORT = Number(process.env.NODE_PORT) || 5000;
// parse request json payload
server.use(express.json());

server.get('/', (req, res) => res.end('Hello Wolrd!'));

// paypal
server.post('/paypal/create-order', createPaypalPayment);
server.post('/paypal/confirm', paypalConfirmPayment);

// stripe
server.post('/stripe/payment', createStripePayment);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
