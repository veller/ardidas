import { useEffect, useState } from "react";
import styles from "../styles/review.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Review = {
  review: string;
};

export const Review: React.FC = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewText, setReviewText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/products/${router.query.productId}/reviews`)
      .then(({ data }) => setReviews(data))
      .then(() => setLoading(false));
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

      {loading && (
        <Skeleton
          height={15}
          width={350}
          count={3}
          style={{ margin: "10px 0 0 20px" }}
        />
      )}

      <ul
        className={styles.reviewList}
        style={{ display: loading ? "none" : undefined }}
      >
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
