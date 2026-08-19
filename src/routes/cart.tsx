import { observer } from 'mobx-react'
import { createFileRoute } from '@tanstack/react-router'
import { cartStore } from '@/shared/cart-store'
import { formatPrice } from '@/shared/lib/utils'

const CartPage = observer(() => {
  return (
    <section>
      <h1>Корзина</h1>
      {cartStore.lines.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <ul>
            {cartStore.lines.map((line) => (
              <li key={line.key}>
                {line.productName} — {line.colorName}
                {line.sizeName ? `, размер ${line.sizeName}` : ''} × {line.quantity} ={' '}
                {formatPrice(String(Number.parseFloat(line.price) * line.quantity))}
              </li>
            ))}
          </ul>
          <p>
            Итого: {formatPrice(String(cartStore.totalPrice))} ({cartStore.totalCount} шт.)
          </p>
        </>
      )}
    </section>
  )
});

export const Route = createFileRoute('/cart')({
  component: CartPage,
});
