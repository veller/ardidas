import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: request?.body?.items ?? [],
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      });

      response.status(200).json(session);
    } catch (error: any) {
      response.status(500).json({
        statusCode: 500,
        message: `Failed to create stripe checkout session: ${error.message}`,
      });
    }
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method Not Allowed");
  }
}
