import { GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../public/images/logo.png";
import styles from "../styles/index.module.css";
interface Props {
  products: Stripe.Product[];
  productsPrices: Stripe.Price[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const products = await stripe.products.list({ limit: 100 });
  const productsPrices = await stripe.prices.list({ limit: 100 });

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

  return ((productPriceObject?.unit_amount ?? 0) / 100).toFixed(2);
};

const HomePage: React.FC<Props> = ({ products, productsPrices }) => {
  return (
    <div className={styles.container}>
      <Image
        src={logoImage}
        alt="shoe logo"
        width={83}
        height={56}
        className={styles.logo}
      />
      <div className={styles.productsGridContainer}>
        {products.map((product: Stripe.Product) => (
          <Link href={"/" + product.id} key={product.id}>
            <a className={styles.productsGridItem}>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={380}
                height={380}
              />
              <div className={styles.productsGridItemDetails}>
                <div>$ {getProductPrice(product.id, productsPrices)}</div>
                <h1>Product</h1>
                <h2>Description</h2>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
