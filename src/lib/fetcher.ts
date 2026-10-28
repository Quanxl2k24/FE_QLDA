import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import type { ApiError } from "@/types";

/**
 * Standardized HTTP Error wrapper
 */
export class FetchError extends Error {
  statusCode?: number;
  code?: string;
  data?: unknown;

  constructor(message: string, statusCode?: number, code?: string, data?: unknown) {
    super(message);
    this.name = "FetchError";
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
  }
}

/**
 * Axios instance configured for backend https://be-qlda-rqdw.onrender.com
 * withCredentials: true ensures browser cookies (session, auth, refreshToken) are sent automatically.
 */
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 30000, // 30s timeout to handle Render cold-starts gracefully
  withCredentials: true, // Send & receive cookies in cross-origin / same-origin requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request Interceptor:
 * If executed on the server side (Next.js Server Components / Server Actions),
 * forward cookies from the incoming browser request using next/headers.
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();
        if (cookieHeader) {
          config.headers.set("Cookie", cookieHeader);
        }
      } catch {
        // Ignored if outside of a request context (e.g., static build time)
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor:
 * Unwraps data or normalizes error messages into FetchError.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const statusCode = error.response?.status;
    const errorData = error.response?.data;
    const message =
      (errorData as { message?: string })?.message ||
      error.message ||
      "An unexpected network error occurred";

    return Promise.reject(
      new FetchError(message, statusCode, error.code, errorData)
    );
  }
);

/**
 * Generic fetcher for TanStack Query or general call usage
 */
export async function fetcher<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

/**
 * Convenient API method helpers
 */
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};
