import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  return (
    <section>
      <h1>Корзина</h1>
      <p>Ваша корзина пуста</p>
    </section>
  )
}
