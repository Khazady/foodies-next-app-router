"use server";

import { MealFormData, saveMeal } from "@/lib/meals";
import { redirect } from "next/navigation";

function isInvalidFormValue(
  formValue: ReturnType<FormData["get"]>,
  options?: { emailCheck?: boolean },
) {
  if (!formValue) {
    return false;
  }
  if (formValue instanceof String) {
    if (formValue.trim() === "") {
      return false;
    }
    if (options?.emailCheck && !formValue.includes("@")) {
      return false;
    }
  }
  if (formValue instanceof File && formValue.size === 0) {
    return false;
  }
  return true;
}

export async function shareMeal(formData: FormData) {
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
    throw new Error("Invalid input");
  }
  await saveMeal(meal as MealFormData);
  redirect("/meals");
}
