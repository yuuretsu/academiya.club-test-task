import type { FC } from "react";
import { observer } from "mobx-react";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import { useCartStore, type CartLine } from "@/shared/cart-store";
import { formatPrice } from "@/shared/lib/utils";
import styles from "./cart-line-item.module.css";

interface CartLineItemProps {
  line: CartLine;
}

export const CartLineItem: FC<CartLineItemProps> = observer(({ line }) => {
  const cartStore = useCartStore();
  const lineTotal = Number.parseFloat(line.price) * line.quantity;
  const linePrice = formatPrice(String(lineTotal));

  return (
    <li className={styles.line}>
      <div className={styles.imageWrapper}>
        {line.image && (
          <img className={styles.image} src={line.image} alt={line.productName} />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{line.productName}</div>
        <div className={styles.details}>
          <span>Цвет: {line.colorName}</span>
          {line.sizeName && <span>Размер: {line.sizeName}</span>}
        </div>
        <div className={styles.price}>{formatPrice(line.price)}</div>
      </div>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => cartStore.decreaseQuantity(line.key)}
          disabled={line.quantity <= 1}
          aria-label="Уменьшить количество"
        >
          <MdRemove aria-hidden="true" />
        </button>
        <span className={styles.quantityValue}>{line.quantity}</span>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={() => cartStore.increaseQuantity(line.key)}
          aria-label="Увеличить количество"
        >
          <MdAdd aria-hidden="true" />
        </button>
      </div>

      <div className={styles.lineTotal}>{linePrice}</div>

      <button
        type="button"
        className={styles.removeButton}
        onClick={() => cartStore.removeLine(line.key)}
        aria-label={`Удалить ${line.productName} из корзины`}
      >
        <MdDelete aria-hidden="true" />
      </button>
    </li>
  );
});