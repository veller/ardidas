const stripe = require("stripe")("replace with secret key");
const products = require("./products-source.json");

async function translate() {
  products.map(async (product) => {
    await stripe.products
      .create({
        id: product.id,
        name: product.name,
        description: product.description,
        images: [`${product.imgUrl}`],
      })
      .then(async () => {
        await stripe.prices.create({
          unit_amount: Number(product.price.toString().padEnd(4, "0")),
          currency: "usd",
          product: product.id,
        });
      });
  });
}

translate();
