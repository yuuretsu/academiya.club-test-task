import { createFileRoute } from '@tanstack/react-router'

const ProductPage = () => {
  const { itemId } = Route.useParams()

  return (
    <section>
      <h1>Товар</h1>
      <p>ID товара: {itemId}</p>
    </section>
  )
};

export const Route = createFileRoute('/card/$itemId')({
  component: ProductPage,
});
