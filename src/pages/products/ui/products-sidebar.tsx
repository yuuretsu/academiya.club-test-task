import type { FC } from "react";
import { observer } from "mobx-react";
import { useProductsPageStore } from "../model";
import { Button } from "@/shared/ui/button";
import { ProductsSearch } from "./products-search";
import styles from "./products-sidebar.module.css";

export const ProductsSidebar: FC = observer(() => {
  const store = useProductsPageStore();

  return (
    <aside className={styles.sidebar}>
      <ProductsSearch />
      <label className={styles.option}>
        <input
          className={`${styles.input} ${styles.checkbox}`}
          type="checkbox"
          checked={store.isOnlyAvailable}
          onChange={(e) => store.setIsOnlyAvailable(e.target.checked)}
        />
        в наличии
      </label>
      <div className={styles.sortGroup}>
        <label className={styles.option}>
          <input
            className={`${styles.input} ${styles.radio}`}
            type="radio"
            name="sort"
            checked={store.sortBy === "default"}
            onChange={(e) => e.target.checked && store.setSortBy("default")}
          />
          по умолчанию
        </label>
        <label className={styles.option}>
          <input
            className={`${styles.input} ${styles.radio}`}
            type="radio"
            name="sort"
            checked={store.sortBy === "price-asc"}
            onChange={(e) => e.target.checked && store.setSortBy("price-asc")}
          />
          цена по возрастанию
        </label>
        <label className={styles.option}>
          <input
            className={`${styles.input} ${styles.radio}`}
            type="radio"
            name="sort"
            checked={store.sortBy === "price-desc"}
            onChange={(e) => e.target.checked && store.setSortBy("price-desc")}
          />
          цена по убыванию
        </label>
      </div>
      {store.hasActiveFilters && (
        <Button onClick={() => store.resetFilters()}>Сбросить фильтры</Button>
      )}
    </aside>
  );
});