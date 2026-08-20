import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { observer } from "mobx-react";
import { MdCheck, MdClose } from "react-icons/md";
import { useCartStore } from "@/shared/cart-store";
import { Button } from "@/shared/ui/button";
import styles from "./promo-code-form.module.css";

export const PromoCodeForm = observer(() => {
  const cartStore = useCartStore();
  const [promoCodeValue, setPromoCodeValue] = useState("");

  const handlePromoCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCodeValue(event.target.value);
  };

  const handlePromoCodeSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isApplied = cartStore.applyPromoCode(promoCodeValue);

    if (isApplied) {
      setPromoCodeValue("");
    }
  };

  const handlePromoCodeRemove = () => {
    cartStore.removePromoCode();
    setPromoCodeValue("");
  };

  return (
    <section className={styles.promoCode} aria-labelledby="promo-code-title">
      <h2 id="promo-code-title" className={styles.title}>Промокод</h2>
      <form className={styles.form} onSubmit={handlePromoCodeSubmit}>
        <input
          className={styles.input}
          value={promoCodeValue}
          onChange={handlePromoCodeChange}
          placeholder="Введите промокод"
          aria-label="Промокод"
          aria-describedby={cartStore.promoCodeError ? "promo-code-error" : undefined}
        />
        <Button type="submit" variant="icon" className={styles.promoIconButton} aria-label="Применить промокод">
          <MdCheck aria-hidden="true" />
        </Button>
      </form>
      {cartStore.promoCodeError && (
        <p id="promo-code-error" className={styles.error} role="alert">
          {cartStore.promoCodeError}
        </p>
      )}
      {cartStore.promoCode && (
        <div className={styles.appliedPromoCode}>
          <span>Применён промокод: {cartStore.promoCode.code}</span>
          <Button
            type="button"
            variant="icon"
            className={styles.promoIconButton}
            onClick={handlePromoCodeRemove}
            aria-label="Удалить промокод"
          >
            <MdClose aria-hidden="true" />
          </Button>
        </div>
      )}
    </section>
  );
});
