import express from 'express';
import paypal from '@paypal/checkout-server-sdk';
import paypalClient from './paypal.client';

const server = express();
const PORT = Number(process.env.NODE_PORT) || 5000;
// parse request json payload
server.use(express.json());

server.get('/', (req, res) => res.end('Hello Wolrd!'));
server.post('/paypal/confirm', async (req, res) => {
    const orderId = req.body.orderId;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({} as any);
    // Call API with your client and get a response for your call
    let response = await paypalClient.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);

    res.status(200).send(response.result);
});

server.post('/paypal/create-order', async (req, res) => {
    const payload = req.body;

    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '10.00',
                },
            },
        ],
    });

    const order = await paypalClient.execute(request);
    res.status(201).send(order);
});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
