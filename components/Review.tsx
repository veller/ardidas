import { useEffect, useState } from "react";
import styles from "../styles/review.module.css";
import { useRouter } from "next/router";
import axios from "axios";

type Review = {
  review: string;
};

export const Review: React.FC = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewText, setReviewText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/products/${router.query.productId}/reviews`)
      .then(({ data }) => setReviews(data));
  }, [router.query.productId]);

  const submitReview = async () => {
    const { data } = await axios.post(
      `/api/products/${router.query.productId}/reviews`,
      { review: reviewText }
    );
    setReviews(data);
    setReviewText("");
    setShowForm(false);
  };

  return (
    <>
      <div className={styles.reviewForm}>
        <button
          className={styles.addReviewButton}
          onClick={() => setShowForm(!showForm)}
        >
          <span>Add a review</span>
        </button>
        {showForm && (
          <>
            <textarea
              className={styles.reviewTextArea}
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              required
            />
            <button
              className={styles.reviewSubmitButton}
              onClick={submitReview}
            >
              Submit
            </button>
          </>
        )}
      </div>
      <ul className={styles.reviewList}>
        {reviews?.map((review, index) => {
          return (
            <li className={styles.reviewItem} key={Math.random() * 10000}>
              <h1>Review #{index + 1}</h1>
              <p>{review}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
