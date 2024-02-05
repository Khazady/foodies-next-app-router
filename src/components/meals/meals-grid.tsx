import styles from "./meals-grid.module.css";
import MealItem from "@/components/meals/meals-item";
import { Meal } from "~/initdb";

type Props = {
  meals: Array<Meal>;
};

export default function MealsGrid({ meals }: Readonly<Props>) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
