import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { Meal } from "~/initdb";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});
const db = sql("meals.db");

export async function getMeals() {
  //to test loading state
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  //to test error state
  // throw new Error("Loading failed");
  return db.prepare("SELECT * FROM meals").all() as unknown as Promise<Meal[]>;
}

export function getMeal(slug: Meal["slug"]) {
  // don't use template sting to protect from SQL injection attack
  // use ? and .get() instead, or in better-sqlite3 syntax it can be replaced like this - @slug
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export type MealFormData = Omit<Meal, "image" | "slug"> & { image: File };

export async function saveMeal(meal: MealFormData) {
  const slug = slugify(meal.title, { lower: true });
  //sanitize html to prevent XSS attack
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "khazady-udemy-nextjs-course-bucket",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  // replace File with path to it, (public folder is already root, so we don't indicate it here
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
  ).run({ ...meal, image: fileName, slug, instructions });
}
