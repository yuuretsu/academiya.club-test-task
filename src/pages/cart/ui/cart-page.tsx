import { observer } from "mobx-react";
import { Link } from "@tanstack/react-router";
import { cartStore } from "@/shared/cart-store";
import { formatPrice } from "@/shared/lib/utils";
import styles from "./cart-page.module.css";

export const CartPage = observer(() => {
  if (cartStore.lines.length === 0) {
    return (
      <section className={styles.emptyState}>
        <h1>Корзина</h1>
        <p>Ваша корзина пуста</p>
        <Link to="/">← Вернуться к каталогу</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Корзина</h1>
      <ul className={styles.list}>
        {cartStore.lines.map((line) => {
          const lineTotal = Number.parseFloat(line.price) * line.quantity;
          const linePrice = formatPrice(String(lineTotal));
          return (
            <li key={line.key} className={styles.line}>
              <div className={styles.imageWrapper}>
                {line.image ? (
                  <img
                    className={styles.image}
                    src={line.image}
                    alt={line.productName}
                  />
                ) : null}
              </div>

              <div className={styles.info}>
                <div className={styles.name}>{line.productName}</div>
                <div className={styles.details}>
                  <span>Цвет: {line.colorName}</span>
                  {line.sizeName ? <span>Размер: {line.sizeName}</span> : null}
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
                  −
                </button>
                <span className={styles.quantityValue}>{line.quantity}</span>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => cartStore.increaseQuantity(line.key)}
                  aria-label="Увеличить количество"
                >
                  +
                </button>
              </div>

              <div className={styles.lineTotal}>{linePrice}</div>

              <button
                type="button"
                className={styles.removeButton}
                onClick={() => cartStore.removeLine(line.key)}
                aria-label={`Удалить ${line.productName} из корзины`}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.total}>
        <span>
          Итого ({cartStore.totalCount} шт.):{" "}
          <strong>{formatPrice(String(cartStore.totalPrice))}</strong>
        </span>
      </div>
    </section>
  );
});