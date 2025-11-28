export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type SortDirection = "ASC" | "DESC";

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: SortDirection;
  query?: string;
  estado?: string;
}

export interface PageMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PageMeta;
}

export interface ApiErrorShape {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
