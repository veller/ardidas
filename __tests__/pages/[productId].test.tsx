import { render, screen, waitFor } from "@testing-library/react";
import Product from "../../pages/[productId]";
import "@testing-library/jest-dom";
import {
  dummyStripePrices,
  dummyStripeProducts,
} from "../utils/dummyStripeData";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({
  data: { id: 1 },
  status: 200,
});
jest.mock("../../utils/get-stripe");
jest.mock("../../components/Review", () => ({ Review: () => <div></div> }));

describe("Product", () => {
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

  it("redirects to checkout when buy with stripe button is clicked", async () => {
    makeSut();

    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("button", { name: "Click to buy using Stripe" })
      );
    });

    expect(mockedAxios.post).toBeCalled();
  });
});
