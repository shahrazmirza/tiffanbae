import {loadStripe} from '@stripe/stripe-js';

export async function chekout({lineitems}){
  let stripePromise = null

  const getStripe = () => {
    if(!stripePromise){
      stripePromise = loadStripe(process.env.STRIPE_PUBLIC_API_KEY)
    }
    return stripePromise
  }

  const stripe = await getStripe()

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  })
}