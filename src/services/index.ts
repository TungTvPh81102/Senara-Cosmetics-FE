// Export all services
export { AuthService } from "./auth.service";
export { UserService } from "./user.service";
export type { User, UpdateUserRequest, ChangePasswordRequest } from "./user.service";

// Export React Query hooks
export * from "./auth.service.hooks";
export * from "./user.service.hooks";

// You can add more services here as your application grows
// export { ProductService } from './product.service';
// export { OrderService } from './order.service';
// export { CategoryService } from './category.service';
