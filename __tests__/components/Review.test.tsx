import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Review } from "../../components/Review";
import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: ["review1", "review2"],
  status: 200,
});
mockedAxios.post.mockResolvedValue({
  data: ["review1", "review2", "review3"],
  status: 200,
});

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { productId: "1" },
  }),
}));

describe("Review", () => {
  const makeSut = () => {
    return render(<Review />);
  };

  it('should render an "Add a review" button', async () => {
    makeSut();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Add a review" })
      ).toBeInTheDocument();
    });
  });

  it('should render a Review text area and submit button upon clicking "Add a review" button', async () => {
    makeSut();

    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("button", { name: "Add a review" })
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });

    // screen.getByRole("");
  });

  it("should update the review list upon submitting a review", async () => {
    makeSut();

    await waitFor(async () => {
      await userEvent.click(
        screen.getByRole("button", { name: "Add a review" })
      );
    });

    await waitFor(async () => {
      await userEvent.type(screen.getByRole("textbox"), "review3");
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    });

    await waitFor(() => {
      expect(screen.getByText("review3")).toBeInTheDocument();
    });
  });
});
