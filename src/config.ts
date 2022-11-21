export default {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    environment: process.env.NODE_PORT ?? 'development',
};
