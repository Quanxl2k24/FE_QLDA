import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (newItem) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === newItem.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
}));
