import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/card/$itemId')({
  component: ProductPage,
})

function ProductPage() {
  const { itemId } = Route.useParams()

  return (
    <section>
      <h1>Товар</h1>
      <p>ID товара: {itemId}</p>
    </section>
  )
}
