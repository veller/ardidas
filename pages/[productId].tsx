import React from "react";
import Stripe from "stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  productId: string;
}

interface Props {
  product: Stripe.Product;
  productPrice: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const products = await stripe.products.list();
  const paths = products.data.map((product) => ({
    params: {
      productId: product.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const { productId } = params as IParams;

  const product = await stripe.products.retrieve(productId);
  const productPrice = await stripe.prices.list({ product: product.id });

  return {
    props: {
      product,
      productPrice: productPrice.data[0].unit_amount,
    },
  };
};

const Product: React.FC<Props> = ({ product, productPrice }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={400}
        height={400}
      />
      <h2>Preço: {(productPrice / 100).toFixed(2)}</h2>

      <br />
      <br />
      <Link href="/">Go back</Link>
    </div>
  );
};

export default Product;
