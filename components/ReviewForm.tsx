import { useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import styles from "../styles/reviewForm.module.css";
import { SessionStorage } from "../types/SessionStorage";
import { ReviewList } from "./ReviewList";

interface Props {
  productId: string;
}

export const ReviewForm: React.FC<Props> = ({ productId }): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [storedValues, setStoredValues] = useSessionStorage<SessionStorage[]>(
    "ardidas-product-reviews",
    []
  );

  const registerReview = (event: any) => {
    event.preventDefault();
    const reviewText = event.target.review.value;
    const productIndex = storedValues?.findIndex(
      (review) => review.productId === productId
    );

    if (productIndex === -1 || productIndex === undefined) {
      setStoredValues([...storedValues!, { productId, reviews: [reviewText] }]);
    } else {
      const reviews = [...storedValues![productIndex].reviews, reviewText];
      const updatedReviews = [...storedValues!];
      updatedReviews[productIndex].reviews = reviews;
      setStoredValues(updatedReviews);
    }

    setShowForm(false);
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
        <form
          className={styles.reviewForm}
          onSubmit={(event) => registerReview(event)}
        >
          <textarea className={styles.reviewInput} name="review" required />
          <button className={styles.reviewSubmitButton} type="submit">
            Submit
          </button>
        </form>
      )}
      <ReviewList productId={productId} />
    </div>
  );
};
