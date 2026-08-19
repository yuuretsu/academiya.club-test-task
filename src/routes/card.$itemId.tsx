import { ProductPageView } from '@/pages/product';
import { createFileRoute } from '@tanstack/react-router'

const ProductPage = () => {
  const { itemId } = Route.useParams()

  return <ProductPageView itemId={itemId} />;
};

export const Route = createFileRoute('/card/$itemId')({
  component: ProductPage,
});
