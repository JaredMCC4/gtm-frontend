import { authTokens } from "./auth-tokens";
import { env } from "./env";
import type { HttpMethod } from "@/types/api";

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
  cache?: RequestCache;
  signal?: AbortSignal;
}

export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${env.NEXT_PUBLIC_API_BASE_URL}${path}`;
}

function buildHeaders(isJson: boolean, optionsHeaders?: HeadersInit) {
  const headers: HeadersInit = optionsHeaders ?? {};
  if (isJson) {
    return {
      "Content-Type": "application/json",
      ...headers,
    };
  }
  return headers;
}

export async function apiClient<T>(
  path: string,
  { method = "GET", body, headers, auth = false, cache = "no-store", signal }: ApiRequestOptions = {},
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const payload = isFormData || body === undefined ? body : JSON.stringify(body);
  const authHeader =
    auth && authTokens.getAccessToken()
      ? { Authorization: `Bearer ${authTokens.getAccessToken()}` }
      : undefined;

  const response = await fetch(buildUrl(path), {
    method,
    body: payload as BodyInit | null | undefined,
    headers: buildHeaders(!isFormData, { ...authHeader, ...headers }),
    cache,
    signal,
  });

  const contentType = response.headers.get("content-type");
  const isJsonResponse = contentType?.includes("application/json");
  const data = isJsonResponse ? await response.json() : null;

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Error HTTP ${response.status}`;
    throw new ApiClientError(message, response.status, data);
  }

  if (data && typeof data === "object" && "data" in data) {
    return (data as { data: T }).data;
  }

  return data as T;
}
