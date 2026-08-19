import { createFileRoute } from '@tanstack/react-router'

const CartPage = () => {
  return (
    <section>
      <h1>Корзина</h1>
      <p>Ваша корзина пуста</p>
    </section>
  )
};

export const Route = createFileRoute('/cart')({
  component: CartPage,
});
