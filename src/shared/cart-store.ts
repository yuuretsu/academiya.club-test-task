import { makeAutoObservable } from "mobx";

export interface CartLine {
  key: string;
  productId: number;
  productName: string;
  colorId: number;
  colorName: string;
  sizeId: number | null;
  sizeName: string | null;
  price: string;
  quantity: number;
}

class CartStore {
  lines: CartLine[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(line: Omit<CartLine, "key" | "quantity">) {
    const key = `${line.productId}-${line.colorId}-${line.sizeId ?? "none"}`;
    const existing = this.lines.find((item) => item.key === key);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.lines.push({ ...line, key, quantity: 1 });
    }
  }

  get totalCount() {
    return this.lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  get totalPrice() {
    return this.lines.reduce(
      (sum, line) => sum + Number.parseFloat(line.price) * line.quantity,
      0,
    );
  }
}

export const cartStore = new CartStore();
