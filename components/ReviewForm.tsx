import { useSessionStorage } from "../hooks/useSessionStorage";
import styles from "../styles/reviewForm.module.css";

export const ReviewForm: React.FC = (): JSX.Element => {
  const [, setStoredValue] = useSessionStorage("test", "1000");
  const registerReview = (event: any) => {
    event.preventDefault();
    setStoredValue(event.target.review.value);
    // setShowForm(false);
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
