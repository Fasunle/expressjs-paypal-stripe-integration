import config from './config';
import { Response, Request } from 'express';
import Stripe from 'stripe';

interface IProduct {
    amount: number;
    currency: string;
    name: string;
    quantity: number;
}

const stripe = new Stripe(config.stripePrivateKey as string, {
    apiVersion: '2022-11-15',
});
export const createStripePayment = async (req: Request, res: Response) => {
    const payload: IProduct[] = req.body.items;
    const items = payload.map((item) => ({
        price_data: {
            currency: item.currency,
            unit_amount: item.amount,
            product_data: {
                name: item.name,
            },
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        currency: 'usd',
        cancel_url: config.clientBaseUrl as string,
        success_url: config.clientBaseUrl as string,
        line_items: items,
    });

    res.status(201).send({
        checkoutUrl: session.url,
        cancelUrl: session.cancel_url,
        successUrl: session.success_url,
    });
};
