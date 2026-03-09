import { getAccessToken } from "@/lib/auth";

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, opts: { status: number; payload?: unknown }) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status;
    this.payload = opts.payload;
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function bestMessageFromPayload(payload: unknown): string | null {
  if (!payload) return null;

  if (typeof payload === "string") return payload;

  if (Array.isArray(payload)) {
    const first = payload[0];
    if (typeof first === "string") return first;
    if (isRecord(first) && typeof first.message === "string") return first.message;
  }

  if (isRecord(payload)) {
    if (typeof payload.message === "string") return payload.message;
    if (typeof payload.error === "string") return payload.error;

    const errors = payload.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const first = errors[0] as unknown;
      if (typeof first === "string") return first;
      if (isRecord(first) && typeof first.message === "string") return first.message;
    }
  }

  return null;
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Something went wrong. Please try again.";
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  auth?: boolean;
};

export async function apiFetch<T>(
  path: string,
  opts: ApiFetchOptions = {},
): Promise<T> {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";
  const url = `${base}${path}`;

  const isFormData = opts.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(opts.body !== undefined && !isFormData
      ? { "Content-Type": "application/json" }
      : {}),
    ...(opts.headers ?? {}),
  };

  const shouldAuth = opts.auth ?? true;
  if (shouldAuth) {
    const accessToken = getAccessToken();
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers,
    body:
      opts.body !== undefined
        ? isFormData
          ? (opts.body as FormData)
          : JSON.stringify(opts.body)
        : undefined,
    signal: opts.signal,
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("planlark.auth"); // Fallback exact key or clearAuth logic
        window.location.href = "/create-account";
      }
    }

    const msg =
      bestMessageFromPayload(payload) ??
      `Request failed (${res.status}). Please try again.`;
    throw new ApiError(msg, { status: res.status, payload });
  }

  return payload as T;
}

