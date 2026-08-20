import type { FC } from "react";
import { observer } from "mobx-react";
import { useProductsPageStore } from "../model";
import { Button } from "@/shared/ui/button";
import styles from "./products-sidebar.module.css";

export const ProductsSidebar: FC = observer(() => {
  const store = useProductsPageStore();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск по названию"
          value={store.searchQuery}
          onChange={(e) => store.setSearchQuery(e.target.value)}
        />
        {store.searchQuery && (
          <button onClick={() => store.setSearchQuery("")}>x</button>
        )}
      </div>
      <label>
        <input
          type="checkbox"
          checked={store.isOnlyAvailable}
          onChange={(e) => store.setIsOnlyAvailable(e.target.checked)}
        />{" "}
        в наличии
      </label>
      <div className={styles.sortGroup}>
        <label>
          <input
            type="radio"
            name="sort"
            checked={store.sortBy === "default"}
            onChange={(e) => e.target.checked && store.setSortBy("default")}
          />{" "}
          по умолчанию
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={store.sortBy === "price-asc"}
            onChange={(e) => e.target.checked && store.setSortBy("price-asc")}
          />{" "}
          цена по возрастанию
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={store.sortBy === "price-desc"}
            onChange={(e) => e.target.checked && store.setSortBy("price-desc")}
          />{" "}
          цена по убыванию
        </label>
      </div>
      {store.hasActiveFilters && (
        <Button onClick={() => store.resetFilters()}>Сбросить фильтры</Button>
      )}
    </aside>
  );
});