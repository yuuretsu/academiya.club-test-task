import { Link } from '@tanstack/react-router'
import { observer } from 'mobx-react'
import { cartStore } from '@/shared/cart-store'
import { formatPrice } from '@/shared/lib/utils'
import styles from './header.module.css'

export const Header = observer(() => {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/cart" className={styles.cartLink}>
          <span>Корзина</span>
          {cartStore.totalCount > 0 && (
            <span className={styles.cartBadge}>
              {cartStore.totalCount} · {formatPrice(String(cartStore.totalPrice))}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
});
