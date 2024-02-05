import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { Meal } from "~/initdb";
import { randomUUID } from "node:crypto";

const db = sql("meals.db");

export async function getMeals() {
  //to test loading state
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  //to test error state
  // throw new Error("Loading failed");
  return db.prepare("SELECT * FROM meals").all() as unknown as Promise<Meal[]>;
}

export function getMeal(slug: Meal["slug"]) {
  // ? and .get() to protect from SQL injection attack, in better-sqlite3 syntax it can be replaced like this @slug
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export type MealFormData = Omit<Meal, "image" | "slug"> & { image: File };

export async function saveMeal(meal: MealFormData) {
  const slug = slugify(meal.title, { lower: true });
  //sanitize html to prevent XSS attack
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}_${randomUUID()}.${extension}`;

  // save file to public/images folder
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  // replace File with path to it, (public folder is already root, so we don't indicate it here
  const imagePath = `/images/${fileName}`;
  db.prepare(
    `
  INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
    )
  `,
  ).run({ ...meal, image: imagePath, slug, instructions });
}
