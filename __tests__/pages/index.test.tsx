import { getByRole, render, screen } from "@testing-library/react";
import HomePage from "../../pages/index";
import "@testing-library/jest-dom";
import {
  dummyStripeProducts,
  dummyStripePrices,
} from "../utils/dummyStripeData";

describe("Home", () => {
  jest.doMock("stripe", () => ({
    products: {
      list: jest.fn().mockResolvedValue(dummyStripeProducts()),
    },
    prices: {
      list: jest.fn().mockResolvedValue(dummyStripePrices()),
    },
  }));

  const makeSut = () => {
    return render(
      <HomePage
        products={dummyStripeProducts()}
        productsPrices={dummyStripePrices()}
      />
    );
  };

  it("renders a list of product links", () => {
    makeSut();
    const products = screen.getAllByRole("link");
    expect(products.length).toBe(dummyStripeProducts().length);
  });

  it("renders a formatted price", () => {
    makeSut();
    const firstProduct = screen.getAllByRole("link", {
      name: "Product 1 $ 10.00 Product Description",
    })[0];
    expect(firstProduct).toHaveTextContent("$ 10.00");
  });

  it("renders a product image", async () => {
    makeSut();

    const product1Image = await screen.findByRole("img", { name: "Product 1" });
    expect(product1Image).toBeInTheDocument();

    // const image = await screen.findByRole("img", {
    //   name: "Product 1",
    // });
    // expect(image).toHaveAttribute(
    //   "src",
    //   `${dummyStripeProducts()[0].images[0]}`
    // );
  });
});
