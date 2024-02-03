export default function MealsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>Meals Layout</p>
      {children}
    </>
  );
}
