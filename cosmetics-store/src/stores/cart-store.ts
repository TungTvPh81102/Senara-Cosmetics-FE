import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/api';

interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (product: Product, quantity = 1, variant?: string) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id && item.selectedVariant === variant
        );

        let newItems: CartItem[];
        if (existingItem) {
          newItems = items.map((item) =>
            item.product.id === product.id && item.selectedVariant === variant
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { product, quantity, selectedVariant: variant }];
        }

        const total = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

        set({ items: newItems, total, itemCount });
      },
      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter((item) => item.product.id !== productId);
        const total = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

        set({ items: newItems, total, itemCount });
      },
      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        const total = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

        set({ items: newItems, total, itemCount });
      },
      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },
      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find((item) => item.product.id === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);