import type { Product } from "@/shared/types";
import { observer } from "mobx-react";
import type { FC } from "react";
import styles from "./product-card.module.css";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/shared/lib/utils";

interface ProductCardImageProps {
  src: string;
  alt: string;
}

const ProductCardImage: FC<ProductCardImageProps> = observer(({ src, alt }) => {
  return (
    <div className={styles.productCardImageWrapper}>
      <img
        className={styles.productCardImage}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
});

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = observer(({ product }) => {
  const img = product.colors.at(0)!.images.at(0)!;
  const price = product.colors.at(0)!.price;
  return (
    <article className={styles.productCardWrapper}>
      <ProductCardImage src={img} alt={product.name} />
      <div className={styles.productCardBody}>
        <h2 className={styles.productCardName}>{product.name}</h2>
        <p className={styles.productCardPrice}>{formatPrice(price)}</p>
      </div>
      <Link className={styles.productCardLink} to={`/product/$itemId`} params={{ itemId: String(product.id) }} aria-label={`Открыть товар ${product.name}`} />
    </article>
  );
});
