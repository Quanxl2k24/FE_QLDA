export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
