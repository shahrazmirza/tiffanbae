const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cartItem, selectedMethod } = req.body;

    const items = cartItem;

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: `${item.name.toUpperCase()} - ${item.size}`,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    let line_items = transformedItems;

    if (selectedMethod === "delivery") {
      line_items.push({
        price_data: {
          currency: "aud",
          product_data: {
            name: "DELIVERY FEE",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      });
    }

    try {
      const sessionOptions = {
        line_items: line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/Success`,
        cancel_url: `${req.headers.origin}/Cancel`,
      };

      if (selectedMethod === "delivery") {
        sessionOptions.shipping_address_collection = {
          allowed_countries: ["AU"],
        };
      }

      const session = await stripe.checkout.sessions.create(sessionOptions);
      res.json({ sessionURL: session.url });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
