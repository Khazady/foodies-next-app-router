"use client";

import styles from "@/app/meals/share/page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useFormState } from "react-dom";
import { shareMeal } from "@/lib/actions";

const initialState: { message: string | null } = { message: null };

export default function NewMealForm() {
  const [state, formAction] = useFormState(shareMeal, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.row}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" required />
        </p>
      </div>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          rows={10}
          required
        ></textarea>
      </p>
      <ImagePicker label="Your image" name="image" />
      {/*useFormState may rerender this, and also it can be a toast or some styled form error*/}
      {state.message && <p>{state.message}</p>}
      <p className={styles.actions}>
        <MealsFormSubmit />
      </p>
    </form>
  );
}
