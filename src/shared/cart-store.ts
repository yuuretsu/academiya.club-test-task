import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { createContextFactory } from "@/shared/lib/utils";

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

export interface PromoCode {
  code: string;
  type: "percent" | "fixed";
  value: number;
}

const promoCodeList: PromoCode[] = [
  { code: "HELLO_WORLD", type: "percent", value: 10 },
  { code: "MINUS_50", type: "fixed", value: 50 },
];

export const fetchPromoCode = (code: string): PromoCode | null => {
  const normalizedCode = code.trim().toUpperCase();

  return promoCodeList.find((promoCode) => promoCode.code === normalizedCode) ?? null;
};

class CartStore {
  lines: CartLine[] = [];
  promoCode: PromoCode | null = null;
  promoCodeError: string | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "cart",
      properties: ["lines", "promoCode"],
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

  applyPromoCode = (code: string) => {
    const promoCode = fetchPromoCode(code);

    if (!promoCode) {
      this.promoCodeError = "Промокод не найден";
      return false;
    }

    this.promoCode = promoCode;
    this.promoCodeError = null;
    return true;
  };

  removePromoCode = () => {
    this.promoCode = null;
    this.promoCodeError = null;
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

  get totalDiscount() {
    if (!this.promoCode) return 0;

    const discount = this.promoCode.type === "percent"
      ? (this.totalPrice * this.promoCode.value) / 100
      : this.promoCode.value;

    return Math.min(discount, this.totalPrice);
  }

  get totalPriceWithDiscount() {
    return this.totalPrice - this.totalDiscount;
  }
}

export const cartStore = new CartStore();

export const {
  useContext: useCartStore,
  withProvider: withCartStoreProvider,
} = createContextFactory<CartStore>("CartStore");
