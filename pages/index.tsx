import { GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
  productsPrices: Stripe.Price[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const products = await stripe.products.list();
  const productsPrices = await stripe.prices.list();

  return {
    props: { products: products.data, productsPrices: productsPrices.data },
  };
};

const getProductPrice = (
  productId: string,
  pricesOfAllProducts: Stripe.Price[]
): string => {
  const productPriceObject = pricesOfAllProducts.find(
    (pp) => pp.product === productId
  );

  if (!productPriceObject || !productPriceObject.unit_amount) {
    return (0).toFixed(2);
  }

  return (productPriceObject.unit_amount / 100).toFixed(2);
};

const HomePage: React.FC<Props> = ({ products, productsPrices }) => {
  return (
    <>
      <h1>no i never cared aboudat</h1>
      {products.map((product: Stripe.Product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={380}
            height={380}
          />
          <h2>Preço: {getProductPrice(product.id, productsPrices)}</h2>
        </div>
      ))}
    </>
  );
};

export default HomePage;
