import { observer } from "mobx-react";
import { useEffect } from "react";
import { ProductsPageStore, withProductsPageStoreProvider, useProductsPageStore } from "../model";
import { ProductsSidebar } from "./products-sidebar";
import { ProductsList } from "./products-list";
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
      <ProductsSidebar />
      <ProductsList />
    </div>
  );
}));
