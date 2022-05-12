import { useEffect, useState } from "react";
import styles from "../styles/reviewForm.module.css";
import { useRouter } from "next/router";

type Review = {
  review: string;
};

export const Review: React.FC = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewText, setReviewText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${router.query.productId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [router.query.productId]);

  const submitReview = async () => {
    const response = await fetch(
      `/api/products/${router.query.productId}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText }),
      }
    );
    const data = await response.json();
    console.log("data: ", data);
    setReviews([data]);
  };

  return (
    <div className={styles.reviewsContainer}>
      <button
        className={styles.addReviewButton}
        onClick={() => setShowForm(true)}
      >
        <span>Add a review</span>
      </button>
      {showForm && (
        <>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            required
          />
          <button onClick={submitReview}>Submit</button>
        </>
      )}
      <ul>
        {reviews?.map((review) => (
          <li key={Math.random() * 10000}>{review}</li>
        ))}
      </ul>
    </div>
  );
};
