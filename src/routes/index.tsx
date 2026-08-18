import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <section>
      <h1>Товары</h1>
      <p>Список товаров</p>
    </section>
  )
}
