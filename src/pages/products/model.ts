import { getProducts } from "@/shared/api";
import type { Product } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";

export type ProductSortBy = "default" | "price-asc" | "price-desc";

const getMinPrice = (product: Product) => {
  return Math.min(...product.colors.map(color => Number.parseFloat(color.price)));
}

export class ProductsPageStore {
  products: Product[] = [];
  searchQuery: string = "";
  isOnlyAvailable: boolean = false;
  sortBy: ProductSortBy = "default";

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    const products = await getProducts();
    runInAction(() => {
      this.products = products;
    });
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  setIsOnlyAvailable = (value: boolean) => {
    this.isOnlyAvailable = value;
  };

  setSortBy = (sortBy: ProductSortBy) => {
    this.sortBy = sortBy;
  };

  get productsListView() {
    const filtered = this
      .products
      .filter(product => product
        .name
        .toLocaleLowerCase()
        .trim()
        .includes(this.searchQuery.toLocaleLowerCase().trim())
      )
      .filter(product => {
        if (!this.isOnlyAvailable) {
          return true;
        }

        return product.colors.some(color => color.sizes.length > 0);
      });

    if (this.sortBy === "price-asc") {
      return [...filtered].sort((a, b) => getMinPrice(a) - getMinPrice(b));
    }

    if (this.sortBy === "price-desc") {
      return [...filtered].sort((a, b) => getMinPrice(b) - getMinPrice(a));
    }

    return filtered;
  }
}