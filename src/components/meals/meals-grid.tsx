import styles from "./meals-grid.module.css";
import MealItem, { Meal } from "@/components/meals/meals-item";

type Props = {
  meals: Array<Meal>;
};

export default function MealsGrid({ meals }: Props) {
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
