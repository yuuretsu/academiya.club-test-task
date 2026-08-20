import type { FC } from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { useProductPageStore } from "../model";
import { formatPrice } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import styles from "./product-info.module.css";

export const ProductInfo: FC = observer(() => {
  const store = useProductPageStore();
  const product = store.product;
  const selectedColor = store.selectedColor;

  if (!product) return null;

  return (
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
  );
});