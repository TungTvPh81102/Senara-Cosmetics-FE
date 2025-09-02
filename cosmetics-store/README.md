# BeautyStore - Cosmetics E-commerce Platform

A modern, full-featured cosmetics e-commerce platform built with Next.js 15, featuring both customer-facing store and admin management interface.

## 🚀 Features

### Customer Features
- 🛍️ Beautiful product catalog with categories
- 🔍 Advanced search and filtering
- 🛒 Shopping cart with persistent state
- ❤️ Wishlist functionality
- 👤 User authentication and profiles
- 📱 Responsive design for all devices

### Admin Features
- 👥 User management with roles and permissions
- 🔐 Role-based access control (RBAC)
- 📦 Product management
- 🏷️ Category management
- 📊 Dashboard with analytics
- ⚙️ System settings

### Technical Features
- ⚡ Next.js 15 with App Router
- 🎨 Beautiful UI with shadcn/ui components
- 🎯 TypeScript for type safety
- 🔄 React Query for data fetching
- 🗄️ Zustand for state management
- 🌐 Axios with comprehensive error handling
- 📈 NProgress for loading indicators
- 🎨 TailwindCSS for styling
- 🔧 ESLint, Prettier, and Husky for code quality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier, Husky

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd cosmetics-store
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update environment variables in \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main website routes
│   │   ├── page.tsx       # Homepage
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Shopping cart
│   │   └── login/         # Authentication
│   ├── admin/             # Admin panel routes
│   │   ├── layout.tsx     # Admin layout
│   │   ├── page.tsx       # Admin dashboard
│   │   ├── users/         # User management
│   │   ├── roles/         # Role management
│   │   ├── permissions/   # Permission management
│   │   ├── products/      # Product management
│   │   └── categories/    # Category management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Global loading page
│   ├── error.tsx          # Global error page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── admin/            # Admin-specific components
│   └── error-boundary.tsx # Error boundary
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # Context providers
├── services/             # API services
├── stores/               # Zustand stores
├── types/                # TypeScript types
└── utils/                # Helper utilities
\`\`\`

## 🔐 Authentication & Authorization

The application includes a comprehensive RBAC (Role-Based Access Control) system:

### Default Roles
- **Admin**: Full system access
- **Manager**: Limited admin access
- **User**: Customer access only

### Demo Login
- **Email**: admin@example.com
- **Password**: Any password (mock authentication)

## 🌐 API Integration

The application is designed to work with a REST API backend. All API calls include:

- ✅ Comprehensive error handling
- ✅ Request/response interceptors
- ✅ Automatic token management
- ✅ Retry logic for failed requests
- ✅ Loading states and error boundaries

### Error Handling
- Network errors with retry logic
- HTTP status code handling (400, 401, 403, 404, 422, 429, 500, etc.)
- User-friendly error messages in Vietnamese
- Toast notifications for all error types
- Automatic token refresh on 401 errors

## 🎨 UI/UX Features

- 📱 Fully responsive design
- 🌙 Dark mode support (via shadcn/ui)
- 🎯 Accessible components
- ⚡ Optimistic updates
- 📊 Loading states and skeletons
- 🔔 Toast notifications
- 📈 Progress indicators

## 🚀 Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run lint:fix\` - Fix ESLint errors
- \`npm run format\` - Format code with Prettier
- \`npm run format:check\` - Check code formatting
- \`npm run type-check\` - Run TypeScript type checking

### Code Quality

The project includes pre-commit hooks that run:
- ESLint for code linting
- Prettier for code formatting
- TypeScript type checking

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| \`NEXT_PUBLIC_API_URL\` | Backend API URL | \`http://localhost:3001/api\` |
| \`NEXT_PUBLIC_APP_URL\` | Frontend app URL | \`http://localhost:3000\` |
| \`NEXT_PUBLIC_APP_NAME\` | Application name | \`BeautyStore\` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/new-feature\`
3. Commit your changes: \`git commit -am 'Add new feature'\`
4. Push to the branch: \`git push origin feature/new-feature\`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Backend Integration

To fully utilize this frontend, you'll need a backend API that provides:

### Required Endpoints
- \`POST /auth/login\` - User authentication
- \`POST /auth/register\` - User registration
- \`GET /auth/profile\` - Get user profile
- \`GET /users\` - List users (admin)
- \`POST /users\` - Create user (admin)
- \`PUT /users/:id\` - Update user (admin)
- \`DELETE /users/:id\` - Delete user (admin)
- \`GET /roles\` - List roles (admin)
- \`GET /permissions\` - List permissions (admin)
- \`GET /products\` - List products
- \`GET /categories\` - List categories

### Response Format
All API responses should follow this format:
\`\`\`json
{
  "data": any,
  "message": "string",
  "success": boolean,
  "status": number
}
\`\`\`

### Error Response Format
\`\`\`json
{
  "message": "string",
  "status": number,
  "code": "string",
  "errors": {
    "field": ["error messages"]
  }
}
\`\`\`

## 🎯 Next Steps

1. Integrate with your backend API
2. Add real product images
3. Implement payment integration
4. Add email notifications
5. Set up analytics tracking
6. Deploy to production

---

Built with ❤️ for the cosmetics industry