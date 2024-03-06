import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_PRIVATE_API_KEY;
const stripeClient = new stripe(stripeSecretKey);

export default async function handler(
  req= NextApiRequest,
  res= NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: 1000, 
      currency: 'aud',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating PaymentIntent' });
  }
}
