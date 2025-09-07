export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  
  USER: {
    PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    AVATAR: '/user/avatar',
    USERS: '/users',
  },

} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
  TIMEOUT_ERROR: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.',
  UNAUTHORIZED: 'Bạn cần đăng nhập để thực hiện hành động này',
  FORBIDDEN: 'Bạn không có quyền thực hiện hành động này',
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
  SERVER_ERROR: 'Lỗi máy chủ nội bộ',
  SERVICE_UNAVAILABLE: 'Dịch vụ tạm thời không khả dụng',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định',
} as const;
