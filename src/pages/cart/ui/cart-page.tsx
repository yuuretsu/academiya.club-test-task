import { observer } from "mobx-react";
import { useCartStore } from "@/shared/cart-store";
import { CartEmptyState } from "./cart-empty-state";
import { CartLineItem } from "./cart-line-item";
import { CartSidebar } from "./cart-sidebar";
import styles from "./cart-page.module.css";

export const CartPage = observer(() => {
  const cartStore = useCartStore();

  if (cartStore.lines.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <section>
      <h1>Корзина</h1>
      <div className={styles.layout}>
        <ul className={styles.list}>
          {cartStore.lines.map((line) => (
            <CartLineItem key={line.key} line={line} />
          ))}
        </ul>
        <CartSidebar />
      </div>
    </section>
  );
});
