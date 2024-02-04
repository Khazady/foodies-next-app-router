import sql from "better-sqlite3";
import { Meal } from "~/initdb";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all() as unknown as Promise<Meal[]>;
}
