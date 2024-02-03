import Link from "next/link";

export default function MealPage() {
  return (
    <main>
      <h1>Meals page</h1>
      <p>
        <Link href="/meals/meal-1">Meal 1</Link>
      </p>
      <p>
        <Link href="/meals/meal-2">Meal 2</Link>
      </p>
    </main>
  );
}
