import styles from "./page.module.css";
import NewMealForm from "@/components/meals/new-meal-form";

export default function ShareMealPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        <NewMealForm />
      </main>
    </>
  );
}
