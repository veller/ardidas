import { GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";

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

  return (productPriceObject?.unit_amount ?? 0 / 100).toFixed(2);
};

const HomePage: React.FC<Props> = ({ products, productsPrices }) => {
  return (
    <>
      {products.map((product: Stripe.Product) => (
        <Link href={"/" + product.id} key={product.id}>
          <a>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={380}
              height={380}
            />
            <div>{getProductPrice(product.id, productsPrices)}</div>
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <hr />
          </a>
        </Link>
      ))}
    </>
  );
};

export default HomePage;
