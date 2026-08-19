import type { Product } from "@/shared/types";
import { observer } from "mobx-react";
import type { FC } from "react";
import styles from "./product-card.module.css";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/shared/lib/utils";

interface ProductCardImageProps {
  src: string
}

const ProductCardImage: FC<ProductCardImageProps> = observer(({ src }) => {
  return (
    <div className={styles.productCardImageWrapper}>
      <img
        className={styles.productCardImage}
        src={src}
        alt=""
      />
    </div>
  )
});

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = observer(({ product }) => {
  const img = product.colors.at(0)!.images.at(0)!;
  const price = product.colors.at(0)!.price;
  return (
    <div className={styles.productCardWrapper}>
      <ProductCardImage src={img} />
      <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <div>
          {product.name}
        </div>
        <div>
          {formatPrice(price)}
        </div>
      </div>
      <Link style={{ position: "absolute", inset: 0 }} to={`/product/$itemId`} params={{ itemId: String(product.id) }} />
    </div>
  )
});
