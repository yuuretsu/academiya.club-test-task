import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ProductPageStore } from "../model";
import { cartStore } from "@/shared/cart-store";
import { formatPrice } from "@/shared/utils";
import styles from "./product-page.module.css";

interface ProductPageViewProps {
  itemId: string;
}

export const ProductPageView = observer(({ itemId }: ProductPageViewProps) => {
  const [store] = useState(() => new ProductPageStore(itemId));
  useEffect(() => {
    store.init();
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

  const product = store.product;
  const color = store.selectedColor;
  const sizeName = (sizeId: number) =>
    store.sizes.find((size) => size.id === sizeId)?.name ?? "";

  const handleAddToCart = () => {
    if (!color || color.id == null) {
      return;
    }
    cartStore.add({
      productId: product.id,
      productName: product.name,
      colorId: color.id,
      colorName: color.name,
      sizeId: store.selectedSizeId,
      sizeName: store.selectedSizeId != null ? sizeName(store.selectedSizeId) : null,
      price: color.price,
    });
  };

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
            <img className={styles.mainImage} src={store.selectedImage} alt={color?.name ?? ""} />
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
        {color && (
          <>
            <div className={styles.price}>{formatPrice(color.price)}</div>
            {color.description && <p className={styles.description}>{color.description}</p>}
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
              const available = store.availableSizeIds.includes(size.id);
              const selected = size.id === store.selectedSizeId;
              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={!available}
                  className={clsx(styles.optionButton, {
                    [styles.optionActive]: selected,
                    [styles.optionDisabled]: !available,
                  })}
                  onClick={() => store.selectSize(size.id)}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>

        <button type="button" className={styles.addButton} onClick={handleAddToCart} disabled={!color}>
          Добавить в корзину
        </button>
      </div>
    </section>
  );
});
