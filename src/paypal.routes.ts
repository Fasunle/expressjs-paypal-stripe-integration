import paypal from '@paypal/checkout-server-sdk';
import { Response, Request } from 'express';
import paypalClient from './paypal.client';

export const paypalConfirmPayment = async (req: Request, res: Response) => {
    const orderId = req.body.orderId;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({} as any);
    // Call API with your client and get a response for your call
    let response = await paypalClient.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);

    res.status(200).send(response.result);
};

export const createPaypalPayment = async (req: Request, res: Response) => {
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
};
