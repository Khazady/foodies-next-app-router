import sql from "better-sqlite3";
import { Meal } from "~/initdb";

const db = sql("meals.db");

export async function getMeals() {
  //to test loading state
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  //to test error state
  // throw new Error("Loading failed");
  return db.prepare("SELECT * FROM meals").all() as unknown as Promise<Meal[]>;
}

export function getMeal(slug: Meal["slug"]) {
  // ? and .get() to protect from SQL injection attack
  return db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(slug) as unknown as Meal;
}
