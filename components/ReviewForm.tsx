import { useSessionStorage } from "../hooks/useSessionStorage";
import styles from "../styles/reviewForm.module.css";

interface Props {
  productId: string;
}

interface SessionStorage {
  productId: string;
  reviews: string[];
}

export const ReviewForm: React.FC<Props> = ({ productId }): JSX.Element => {
  const [storedValues, setStoredValues] = useSessionStorage<SessionStorage[]>(
    "ardidas-product-reviews",
    []
  );

  console.log("storedValues: ", storedValues);

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
  };

  return (
    <form
      className={styles.reviewForm}
      onSubmit={(event) => registerReview(event)}
    >
      <textarea className={styles.reviewInput} name="review" required />
      <button className={styles.reviewSubmitButton} type="submit">
        Submit
      </button>
    </form>
  );
};
