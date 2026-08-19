import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { ProductsPageStore } from "../model";
import { ProductCard } from "./product-card";
import styles from "./products-page.module.css";

export const ProductsPage = observer(() => {
  const [store] = useState(() => new ProductsPageStore());
  useEffect(() => {
    store.init();
  }, [store]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div>
          <input type="text" placeholder="Поиск по названию" value={store.searchQuery} onChange={e => store.setSearchQuery(e.target.value)} />
          <button onClick={() => store.setSearchQuery("")}>x</button>
        </div>
        <label>
          <input type="checkbox" checked={store.isOnlyAvailable} onChange={e => store.setIsOnlyAvailable(e.target.checked)} /> в наличии
        </label>
        <div className={styles.sortGroup}>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "default"} onChange={e => e.target.checked && store.setSortBy("default")} /> по умолчанию
          </label>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "price-asc"} onChange={e => e.target.checked && store.setSortBy("price-asc")} /> цена по возрастанию
          </label>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "price-desc"} onChange={e => e.target.checked && store.setSortBy("price-desc")} /> цена по убыванию
          </label>
        </div>
        {store.hasActiveFilters && (
          <button onClick={() => store.resetFilters()}>Сбросить фильтры</button>
        )}
      </aside>
      <div className={styles.listContent}>
        <ul className={styles.list}>
          {store.productsListView.map(product => {
            return (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
});