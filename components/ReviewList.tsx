import { useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { SessionStorage } from "../types/SessionStorage";

interface Props {
  productId: string;
}

export const ReviewList: React.FC<Props> = ({ productId }): JSX.Element => {
  const [reviews, _] = useSessionStorage<SessionStorage[]>(
    "ardidas-product-reviews",
    []
  );

  const productReviews = reviews?.find(
    (review) => review.productId === productId
  )?.reviews;

  return (
    <ul>
      {productReviews?.map((review) => (
        <li key={Math.random() * 10000}>{review}</li>
      ))}
    </ul>
  );
};
