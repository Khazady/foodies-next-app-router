"use client";

export default function MealsErrorPage(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(props.error.message);
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
