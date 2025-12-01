import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

process.env.NEXT_PUBLIC_API_BASE_URL ??= "http://localhost:2828/api/v1";
process.env.NEXT_PUBLIC_APP_ENV ??= "development";
process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??= "test-google-client-id";
process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ??= "test-github-client-id";
process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??= "1x00000000000000000000AA";

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});
