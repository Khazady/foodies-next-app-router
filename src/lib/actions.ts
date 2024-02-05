"use server";

import { MealFormData, saveMeal } from "@/lib/meals";
import { redirect } from "next/navigation";

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  await saveMeal(meal as MealFormData);
  redirect("/meals");
}
