import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export interface CartLine {
  key: string;
  productId: number;
  productName: string;
  colorId: number;
  colorName: string;
  sizeId: number | null;
  sizeName: string | null;
  price: string;
  image: string;
  quantity: number;
}

class CartStore {
  lines: CartLine[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "cart",
      properties: ["lines"],
      storage: window.localStorage,
    });
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

  increaseQuantity = (key: string) => {
    const line = this.lines.find((item) => item.key === key);
    if (line) {
      line.quantity += 1;
    }
  };

  decreaseQuantity = (key: string) => {
    const line = this.lines.find((item) => item.key === key);
    if (line && line.quantity > 1) {
      line.quantity -= 1;
    }
  };

  setQuantity = (key: string, quantity: number) => {
    const line = this.lines.find((item) => item.key === key);
    if (!line) return;
    const normalizedQuantity = Math.max(1, Math.floor(quantity));
    if (!Number.isFinite(normalizedQuantity)) return;
    line.quantity = normalizedQuantity;
  };

  removeLine = (key: string) => {
    this.lines = this.lines.filter((item) => item.key !== key);
  };

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
