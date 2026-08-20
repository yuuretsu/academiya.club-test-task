import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { MdArrowBack } from "react-icons/md";
import { ProductPageStore, useProductPageStore, withProductPageStoreProvider } from "../model";
import { Gallery } from "./gallery";
import { ProductInfo } from "./product-info";
import styles from "./product-page.module.css";

interface ProductPageViewProps {
  itemId: string;
}

export const ProductPageView = withProductPageStoreProvider<ProductPageViewProps>(
  ({ itemId }) => new ProductPageStore(itemId)
)(observer(() => {
  const store = useProductPageStore();

  useEffect(() => {
    store.init();

    return () => store.reset();
  }, [store]);

  if (store.isLoading) {
    return <p className={styles.emptyState}>Загрузка...</p>;
  }

  if (store.isNotFound || !store.product) {
    return (
      <section className={styles.notFound}>
        <h1>Товар не найден</h1>
        <Link to="/">
          <MdArrowBack aria-hidden="true" /> Вернуться к списку товаров
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Gallery />
      <ProductInfo />
    </section>
  );
}));
