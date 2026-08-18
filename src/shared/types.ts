export interface ProductSize {
  id: number;
  name: string;
  number: number;
}

export interface ProductColor {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
}

export interface ProductCategory {
  id: number;
  name: string;
}


export interface Product {
  id: number;
  name: string;
  categoryId: number;
  brand: string;
  colors: ProductColor[];
}