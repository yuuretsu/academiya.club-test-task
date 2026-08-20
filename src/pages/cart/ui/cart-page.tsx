import { observer } from "mobx-react";
import { useCartStore } from "@/shared/cart-store";
import { formatPrice } from "@/shared/lib/utils";
import { CartEmptyState } from "./cart-empty-state";
import { CartLineItem } from "./cart-line-item";
import styles from "./cart-page.module.css";

export const CartPage = observer(() => {
  const cartStore = useCartStore();

  if (cartStore.lines.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <section>
      <h1>Корзина</h1>
      <ul className={styles.list}>
        {cartStore.lines.map((line) => (
          <CartLineItem key={line.key} line={line} />
        ))}
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