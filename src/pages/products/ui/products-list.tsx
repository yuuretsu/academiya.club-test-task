import type { FC } from "react";
import { observer } from "mobx-react";
import { useProductsPageStore } from "../model";
import { ProductCard } from "./product-card";
import styles from "./products-list.module.css";

export const ProductsList: FC = observer(() => {
  const store = useProductsPageStore();

  if (store.isLoading) {
    return <div className={styles.listContent}><p className={styles.emptyState}>Загрузка...</p></div>;
  }

  if (store.products.length === 0) {
    return <div className={styles.listContent}><p className={styles.emptyState}>В каталоге сейчас нет товаров</p></div>;
  }

  if (store.productsListView.length === 0) {
    return <div className={styles.listContent}><p className={styles.emptyState}>По вашему запросу ничего не найдено</p></div>;
  }

  return (
    <div className={styles.listContent}>
      <ul className={styles.list}>
        {store.productsListView.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
});