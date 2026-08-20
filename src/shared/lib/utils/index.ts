export { createContextFactory } from "./context-factory";
export { compose } from "./compose";

export const formatPrice = (price: string): string => {
  const numericPrice = parseFloat(price);

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};
