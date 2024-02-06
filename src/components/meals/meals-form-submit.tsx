"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {/*useFormStatus may update this UI, just like useState*/}
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
