import Stripe from "stripe";

export const dummyStripeProducts = (): Stripe.Product[] => {
  return [
    {
      id: "prod_FfX1ZKX1ZKX1ZKZZZZ",
      name: "Product 1",
      images: ["https://example.com/image1.png"],
    },
    {
      id: "prod_FfX1ZKX1ZKX1ZKXXXX",
      name: "Product 2",
      images: ["https://example.com/image2.png"],
    },
  ] as unknown as Stripe.Product[];
};

export const dummyStripePrices = (): Stripe.Price[] => {
  return [
    {
      id: "price_FfX1ZKX1ZKX1ZKX",
      unit_amount: 1000,
      currency: "usd",
      product: "prod_FfX1ZKX1ZKX1ZKZZZZ",
    },
    {
      id: "price_FfX1ZKX1ZKX1ZKX",
      unit_amount: 2000,
      currency: "usd",
      product: "prod_FfX1ZKX1ZKX1ZKXXXX",
    },
  ] as unknown as Stripe.Price[];
};
