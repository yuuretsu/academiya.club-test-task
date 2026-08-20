import type { FC } from "react";
import { observer } from "mobx-react";
import { Link } from "@tanstack/react-router";
import { MdArrowBack } from "react-icons/md";
import styles from "./cart-empty-state.module.css";

export const CartEmptyState: FC = observer(() => {
  return (
    <section className={styles.emptyState}>
      <h1>Корзина</h1>
      <p>Ваша корзина пуста</p>
      <Link to="/">
        <MdArrowBack aria-hidden="true" /> Вернуться к каталогу
      </Link>
    </section>
  );
});