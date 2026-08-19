import { observer } from "mobx-react-lite";
import { useEffect, useState, type FC } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ProductPageStore } from "../model";
import { formatPrice } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import styles from "./product-page.module.css";

interface ProductPageViewProps {
  itemId: string;
}

export const ProductPageView: FC<ProductPageViewProps> = observer(({ itemId }) => {
  const [store] = useState(() => new ProductPageStore(itemId));

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
        <Link to="/">← Вернуться к списку товаров</Link>
      </section>
    );
  }

  const { product, selectedColor } = store;

  return (
    <section className={styles.page}>
      <div className={styles.imagesBlock}>
        <div className={styles.mainImageWrapper}>
          {store.images.length > 1 && (
            <button
              type="button"
              className={styles.arrowLeft}
              onClick={store.prevImage}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          )}
          {store.selectedImage ? (
            <img
              className={styles.mainImage}
              src={store.selectedImage}
              alt={selectedColor?.name ?? ""}
            />
          ) : null}
          {store.images.length > 1 && (
            <button
              type="button"
              className={styles.arrowRight}
              onClick={store.nextImage}
              aria-label="Следующее фото"
            >
              ›
            </button>
          )}
        </div>
        {store.images.length > 1 && (
          <div className={styles.thumbnails}>
            {store.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={clsx(styles.thumbnail, { [styles.thumbnailActive]: index === store.imageIndex })}
                onClick={() => store.setImageIndex(index)}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        {store.category && <div className={styles.category}>{store.category.name}</div>}
        <h1 className={styles.title}>{product.name}</h1>
        {selectedColor && (
          <>
            <div className={styles.price}>{formatPrice(selectedColor.price)}</div>
            {selectedColor.description && <p className={styles.description}>{selectedColor.description}</p>}
          </>
        )}

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Цвет</div>
          <div className={styles.options}>
            {product.colors.map((item) => (
              <button
                key={item.id}
                type="button"
                className={clsx(styles.optionButton, { [styles.optionActive]: item.id === store.selectedColorId })}
                onClick={() => store.selectColor(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Размер</div>
          <div className={styles.options}>
            {store.sizes.map((size) => {
              const isAvailable = store.availableSizeIds.includes(size.id);
              const isSelected = size.id === store.selectedSizeId;
              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={!isAvailable}
                  className={clsx(styles.optionButton, {
                    [styles.optionActive]: isSelected,
                    [styles.optionDisabled]: !isAvailable,
                  })}
                  onClick={() => store.selectSize(size.id)}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          className={styles.addButton}
          onClick={store.addToCart}
          disabled={!selectedColor?.id || !store.selectedSizeId}
        >
          Добавить в корзину
        </Button>
      </div>
    </section>
  );
});
