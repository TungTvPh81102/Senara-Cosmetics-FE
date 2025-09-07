# React Query Integration Guide

Hướng dẫn sử dụng React Query với API configuration cho dự án Next.js.

## 🎯 Kiến trúc mới

### 1. **Cấu trúc thư mục**
```
src/
├── lib/
│   ├── api.ts              # Axios configuration
│   ├── query-client.ts     # React Query configuration
│   ├── query-keys.ts       # Query keys factory
│   └── api-config.ts       # API constants
├── providers/
│   └── query-provider.tsx  # React Query provider
├── hooks/
│   ├── useCrud.ts         # Generic CRUD hooks
│   ├── useAuth.ts         # Authentication hooks
│   ├── useUser.ts         # User management hooks
│   └── index.ts
├── services/
│   ├── auth.service.ts    # Raw API calls
│   ├── auth.service.hooks.ts # React Query hooks
│   ├── user.service.ts    # Raw API calls
│   ├── user.service.hooks.ts # React Query hooks
│   └── index.ts
└── examples/
    ├── api-usage.tsx      # Legacy examples
    └── react-query-example.tsx # React Query examples
```

## 🚀 Cách sử dụng

### 1. **Setup Provider**

Đã được cấu hình trong `layout.tsx`:
```tsx
import { QueryProvider } from "@/providers/query-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 2. **Sử dụng React Query Hooks**

#### Authentication
```tsx
import { useLogin, useRegister, useMe, useLogout } from '@/services';

function LoginForm() {
  const loginMutation = useLogin();
  const { data: currentUser } = useMe();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Tự động redirect và update cache
    } catch (error) {
      // Tự động hiển thị toast error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
```

#### User Management
```tsx
import { useUserProfile, useUpdateProfile, useUsers } from '@/services';

function UserProfile() {
  const { data: profile, isLoading } = useUserProfile();
  const updateMutation = useUpdateProfile();
  const { data: usersList } = useUsers({ page: 1, per_page: 10 });

  const handleUpdate = async (userData) => {
    await updateMutation.mutateAsync(userData);
    // Tự động invalidate cache và refetch
  };

  return (
    <div>
      {isLoading ? 'Loading...' : (
        <div>
          <h1>{profile?.name}</h1>
          <button onClick={() => handleUpdate({ name: 'New Name' })}>
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}
```

### 3. **Generic CRUD Hooks**

```tsx
import { useCreate, useUpdate, useDelete, useGet } from '@/hooks';

// Generic CREATE
const createMutation = useCreate(
  (data) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json()),
  {
    successMessage: 'Tạo thành công!',
    invalidateQueries: [queryKeys.users.lists()],
  }
);

// Generic UPDATE
const updateMutation = useUpdate(
  ({ id, data }) => fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json()),
  {
    successMessage: 'Cập nhật thành công!',
    invalidateQueries: [queryKeys.users.lists()],
  }
);

// Generic DELETE
const deleteMutation = useDelete(
  (id) => fetch(`/api/users/${id}`, { method: 'DELETE' }),
  {
    successMessage: 'Xóa thành công!',
    invalidateQueries: [queryKeys.users.lists()],
  }
);

// Generic GET
const { data, isLoading, error } = useGet(
  queryKeys.users.detail(userId),
  () => fetch(`/api/users/${userId}`).then(res => res.json())
);
```

## 🔧 Tính năng chính

### 1. **Automatic Caching**
- Dữ liệu được cache tự động
- Background refetching khi cần thiết
- Stale time: 5 phút
- Cache time: 10 phút

### 2. **Error Handling**
- Tự động retry cho network errors
- Không retry cho 4xx errors
- Toast notifications tự động
- Validation errors được hiển thị chi tiết

### 3. **Loading States**
- `isLoading`: Lần đầu load
- `isPending`: Mutation đang chạy
- `isFetching`: Đang refetch
- `isSuccess`: Thành công
- `isError`: Có lỗi

### 4. **Cache Management**
- Tự động invalidate sau mutations
- Optimistic updates
- Prefetching data
- Manual cache control

### 5. **Query Keys Factory**
```tsx
// Structured query keys
const queryKeys = {
  users: {
    all: ['users'],
    lists: () => [...queryKeys.users.all, 'list'],
    list: (filters) => [...queryKeys.users.lists(), { filters }],
    details: () => [...queryKeys.users.all, 'detail'],
    detail: (id) => [...queryKeys.users.details(), id],
  },
};
```

## 📝 Best Practices

### 1. **Query Keys**
- Sử dụng query keys factory
- Consistent naming convention
- Hierarchical structure

### 2. **Error Handling**
- Sử dụng toast notifications
- Specific error messages
- Validation error handling

### 3. **Loading States**
- Sử dụng `isPending` cho mutations
- Sử dụng `isLoading` cho queries
- Disable buttons khi loading

### 4. **Cache Invalidation**
- Invalidate related queries sau mutations
- Sử dụng optimistic updates khi phù hợp
- Prefetch data khi cần thiết

### 5. **Type Safety**
- Đầy đủ TypeScript types
- Generic hooks cho reusability
- Type-safe query keys

## 🔄 Migration từ Legacy

### Trước (Legacy)
```tsx
const { data, loading, error, execute } = useApi(AuthService.login, {
  onSuccess: (data) => {
    console.log('Success:', data);
  },
  showSuccessToast: true,
});
```

### Sau (React Query)
```tsx
const loginMutation = useLogin();

const handleLogin = async (credentials) => {
  try {
    await loginMutation.mutateAsync(credentials);
    // Tự động xử lý success
  } catch (error) {
    // Tự động xử lý error
  }
};
```

## 🛠️ DevTools

React Query DevTools đã được cấu hình và chỉ hiển thị trong development mode:
- Xem cache state
- Debug queries và mutations
- Monitor performance
- Inspect query keys

## 📚 Tài liệu tham khảo

- [React Query Documentation](https://tanstack.com/query/latest)
- [Query Keys Best Practices](https://tkdodo.eu/blog/effective-react-query-keys)
- [Error Handling Patterns](https://tkdodo.eu/blog/react-query-error-handling)
