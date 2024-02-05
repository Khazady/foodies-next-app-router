"use server";

import { MealFormData, saveMeal } from "@/lib/meals";
import { redirect } from "next/navigation";

function isInvalidFormValue(
  formValue: ReturnType<FormData["get"]>,
  options?: { emailCheck?: boolean },
) {
  if (!formValue) {
    return true;
  }
  if (formValue instanceof String) {
    if (formValue.trim() === "") {
      return true;
    }
    if (options?.emailCheck && !formValue.includes("@")) {
      return true;
    }
  }
  if (formValue instanceof Blob && formValue.size === 0) {
    return true;
  }
  return false;
}

export async function shareMeal(
  // can be used for editing and prepopulating existing data?
  prevState: { message: string | null },
  formData: FormData,
) {
  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidFormValue(meal.title) ||
    isInvalidFormValue(meal.summary) ||
    isInvalidFormValue(meal.image) ||
    isInvalidFormValue(meal.instructions) ||
    isInvalidFormValue(meal.creator) ||
    isInvalidFormValue(meal.creator_email, { emailCheck: true })
  ) {
    return {
      message: "Invalid input",
    };
  }
  await saveMeal(meal as MealFormData);
  redirect("/meals");
}
