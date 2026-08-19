import { getCategory, getProduct, getSizes } from "@/shared/api";
import type { Product, ProductCategory, ProductColor, ProductSize } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";

export class ProductPageStore {
  product: Product | null = null;
  category: ProductCategory | null = null;
  sizes: ProductSize[] = [];
  isLoading = true;
  isNotFound = false;
  selectedColorId: number | null = null;
  selectedSizeId: number | null = null;
  imageIndex = 0;
  readonly itemId: string;

  constructor(itemId: string) {
    this.itemId = itemId;
    makeAutoObservable(this);
  }

  init = async () => {
    this.isLoading = true;
    try {
      const [product, sizes] = await Promise.all([
        getProduct(this.itemId),
        getSizes(),
      ]);
      const category = await getCategory(String(product.categoryId)).catch(() => null);
      runInAction(() => {
        this.product = product;
        this.sizes = sizes;
        this.category = category;
        this.selectedColorId = product.colors[0]?.id ?? null;
        this.selectedSizeId = null;
        this.imageIndex = 0;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.isLoading = false;
        this.isNotFound = true;
      });
    }
  };

  get selectedColor(): ProductColor | null {
    return this.product?.colors.find((color) => color.id === this.selectedColorId) ?? null;
  }

  get images(): string[] {
    return this.selectedColor?.images ?? [];
  }

  get selectedImage(): string | null {
    return this.images[this.imageIndex] ?? null;
  }

  get availableSizeIds(): number[] {
    return this.selectedColor?.sizes ?? [];
  }

  selectColor = (colorId: number) => {
    this.selectedColorId = colorId;
    this.selectedSizeId = null;
    this.imageIndex = 0;
  };

  selectSize = (sizeId: number) => {
    this.selectedSizeId = sizeId;
  };

  setImageIndex = (index: number) => {
    if (index < 0 || index >= this.images.length) {
      return;
    }
    this.imageIndex = index;
  };

  nextImage = () => {
    if (this.images.length === 0) {
      return;
    }
    this.setImageIndex((this.imageIndex + 1) % this.images.length);
  };

  prevImage = () => {
    if (this.images.length === 0) {
      return;
    }
    this.setImageIndex((this.imageIndex - 1 + this.images.length) % this.images.length);
  };

  get selectedSize(): ProductSize | null {
    return this.sizes.find(size => this.selectedSizeId === size.id) ?? null;
  };
}
