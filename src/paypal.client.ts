import paypal from '@paypal/checkout-server-sdk';
import config from './config';

const Environment =
    config.environment === 'production'
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;

const paypalEnvironment = new Environment(
    config.paypalClientId as string,
    config.paypalClientSecret as string,
);

let client = new paypal.core.PayPalHttpClient(paypalEnvironment);

export default client;
