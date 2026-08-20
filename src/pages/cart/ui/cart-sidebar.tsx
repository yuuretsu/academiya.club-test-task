import { observer } from "mobx-react";
import { useCartStore } from "@/shared/cart-store";
import { formatPrice } from "@/shared/lib/utils";
import { PromoCodeForm } from "./promo-code-form";
import styles from "./cart-sidebar.module.css";

export const CartSidebar = observer(() => {
  const cartStore = useCartStore();

  return (
    <aside className={styles.sidebar}>
      <PromoCodeForm />
      <div className={styles.total}>
        <div className={styles.totalRow}>
          <span>Товары ({cartStore.totalCount} шт.)</span>
          <span>{formatPrice(String(cartStore.totalPrice))}</span>
        </div>
        {cartStore.promoCode && (
          <div className={styles.totalRow}>
            <span>Скидка по промокоду {cartStore.promoCode.code}</span>
            <span>-{formatPrice(String(cartStore.totalDiscount))}</span>
          </div>
        )}
        <div className={styles.totalRow}>
          <strong>Итого</strong>
          <strong>{formatPrice(String(cartStore.totalPriceWithDiscount))}</strong>
        </div>
      </div>
    </aside>
  );
});
