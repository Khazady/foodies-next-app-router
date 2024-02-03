type Props = Readonly<{ params: { slug: string } }>;

export default function MealDetailsPage({ params }: Props) {
  return (
    <main>
      <h1>Meal Details</h1>
      <p>{params.slug}</p>
    </main>
  );
}
