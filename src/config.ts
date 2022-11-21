export default {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    environment: process.env.NODE_ENV ?? 'development',
    stripePrivateKey: process.env.STRIPE_PRIVATE_KEY,
    clientBaseUrl: process.env.CLIENT_BASE_URL ?? 'http://localhost:5000',
};
