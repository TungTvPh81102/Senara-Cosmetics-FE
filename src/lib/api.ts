import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ApiResponse, ApiError, HttpStatus, RequestConfig } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_TIMEOUT = 10000;

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          config.headers["X-CSRF-TOKEN"] = csrfToken;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      },
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    const apiError: ApiError = {
      message: "Đã xảy ra lỗi không xác định",
      status: 500,
    };

    if (error.response) {
      const { status, data } = error.response;
      apiError.status = status;

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          apiError.message = "Yêu cầu không hợp lệ";
          break;
        case HttpStatus.UNAUTHORIZED:
          apiError.message = "Bạn cần đăng nhập để thực hiện hành động này";
          this.handleUnauthorized();
          break;
        case HttpStatus.FORBIDDEN:
          apiError.message = "Bạn không có quyền thực hiện hành động này";
          break;
        case HttpStatus.NOT_FOUND:
          apiError.message = "Không tìm thấy dữ liệu";
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          apiError.message = "Dữ liệu không hợp lệ";
          if (data && typeof data === "object" && "errors" in data) {
            apiError.errors = (data as any).errors;
          }
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          apiError.message = "Lỗi máy chủ nội bộ";
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          apiError.message = "Dịch vụ tạm thời không khả dụng";
          break;
        default:
          apiError.message = `Lỗi ${status}: ${this.getErrorMessage(data)}`;
      }

      if (data && typeof data === "object") {
        const laravelData = data as any;
        if (laravelData.message) {
          apiError.message = laravelData.message;
        }
      }
    } else if (error.request) {
      apiError.message = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.";
      apiError.status = 0;
    } else {
      apiError.message = error.message || "Đã xảy ra lỗi không xác định";
    }

    return Promise.reject(apiError);
  }

  private getErrorMessage(data: any): string {
    if (typeof data === "string") return data;
    if (data && typeof data === "object") {
      if (data.message) return data.message;
      if (data.error) return data.error;
    }
    return "Lỗi không xác định";
  }

  private handleUnauthorized() {
    this.clearAuthTokenStorage();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  private setAuthTokenStorage(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
  }

  private clearAuthTokenStorage(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
  }

  private getCsrfToken(): string | null {
    if (typeof window === "undefined") return null;
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || null;
  }

  public setAuthToken(token: string): void {
    this.setAuthTokenStorage(token);
  }

  public clearAuth(): void {
    this.clearAuthTokenStorage();
  }

  public async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config);
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config);
    return response.data;
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.patch(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config);
    return response.data;
  }

  public async upload<T = any>(
    url: string,
    formData: FormData,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async download(url: string, filename?: string): Promise<void> {
    const response = await this.instance.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

const apiClient = new ApiClient();

export default apiClient;
export { ApiClient };
