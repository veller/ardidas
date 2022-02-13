import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const id = request.query.id.toString();

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(id);

    response.status(200).json(checkoutSession);
  } catch (error: any) {
    response.status(500).json({ statusCode: 500, message: error.message });
  }
}
