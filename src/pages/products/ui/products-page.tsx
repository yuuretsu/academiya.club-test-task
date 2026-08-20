import { observer } from "mobx-react";
import { useEffect } from "react";
import { ProductsPageStore, withProductsPageStoreProvider, useProductsPageStore } from "../model";
import { ProductCard } from "./product-card";
import { Button } from "@/shared/ui/button";
import styles from "./products-page.module.css";

export const ProductsPage = withProductsPageStoreProvider(
  () => new ProductsPageStore()
)(observer(() => {
  const store = useProductsPageStore();

  useEffect(() => {
    store.init();
  }, [store]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.searchRow}>
          <input className={styles.searchInput} type="text" placeholder="Поиск по названию" value={store.searchQuery} onChange={e => store.setSearchQuery(e.target.value)} />
          {store.searchQuery && <button onClick={() => store.setSearchQuery("")}>x</button>}
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
          <Button onClick={() => store.resetFilters()}>Сбросить фильтры</Button>
        )}
      </aside>
      <div className={styles.listContent}>
        {store.isLoading ? (
          <p className={styles.emptyState}>Загрузка...</p>
        ) : store.products.length === 0 ? (
          <p className={styles.emptyState}>В каталоге сейчас нет товаров</p>
        ) : store.productsListView.length === 0 ? (
          <p className={styles.emptyState}>По вашему запросу ничего не найдено</p>
        ) : (
          <ul className={styles.list}>
            {store.productsListView.map(product => {
              return (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}));
