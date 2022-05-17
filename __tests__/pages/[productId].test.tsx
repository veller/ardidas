import { render, screen } from "@testing-library/react";
import Product from "../../pages/[productId]";
import "@testing-library/jest-dom";
import {
  dummyStripePrices,
  dummyStripeProducts,
} from "../utils/dummyStripeData";

jest.mock("../../components/Review", () => ({ Review: () => <div></div> }));

describe("Product", () => {
  jest.mock("stripe", () => ({
    products: {
      list: jest.fn().mockResolvedValue(dummyStripeProducts()),
    },
    prices: {
      list: jest.fn().mockResolvedValue(dummyStripePrices()),
    },
  }));

  const makeSut = () => {
    const productPrice = dummyStripePrices()[0];
    return render(
      <Product
        product={dummyStripeProducts()[0]}
        productPrice={productPrice.unit_amount!}
        productPriceId={productPrice.id}
      />
    );
  };

  it("renders the product title", () => {
    makeSut();
    const title = screen.getByRole("heading", {
      name: `${dummyStripeProducts()[0].name}`,
    });
    expect(title).toBeInTheDocument();
  });

  it("renders the product price", () => {
    makeSut();
    const price = screen.getByRole("heading", { name: `$10.00` });
    expect(price).toBeInTheDocument();
  });

  it("renders the product image", async () => {
    makeSut();
    const image = await screen.findByRole("img", {
      name: `${dummyStripeProducts()[0].name}`,
    });
    expect(image).toBeInTheDocument();
  });

  it("renders the buy with stripe button", () => {
    makeSut();
    const button = screen.getByRole("button", {
      name: "Click to buy using Stripe",
    });
    expect(button).toBeInTheDocument();
  });
});
