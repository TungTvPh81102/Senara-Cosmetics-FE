export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },

  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), { filters }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
    categories: () => [...queryKeys.products.all, 'categories'] as const,
  },

  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.orders.lists(), { filters }] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.orders.details(), id] as const,
  },

  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.categories.lists(), { filters }] as const,
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.categories.details(), id] as const,
  },
} as const;

export const createQueryKey = (baseKey: readonly string[], filters?: Record<string, any>) => {
  if (!filters || Object.keys(filters).length === 0) {
    return baseKey;
  }
  return [...baseKey, { filters }] as const;
};
