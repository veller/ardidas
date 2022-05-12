import { NextApiRequest, NextApiResponse } from "next";
import productsDb from "../../../../utils/products-source.json";

interface Review {
  review: string;
}

export default function reviewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { productId },
    method,
  } = req;

  switch (method) {
    case "GET":
      const productReviews = productsDb.find(
        (product) => product.id === productId
      )?.reviews;
      if (productReviews) {
        res.status(200).json(productReviews);
      } else {
        res.status(404).json({ message: "Product not found" });
      }

      break;
    case "POST":
      const newReview = (req.body as Review).review;
      const product = productsDb.find((product) => product.id === productId);
      if (product) {
        product.reviews.push(newReview);
        res.status(200).json(product.reviews);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
