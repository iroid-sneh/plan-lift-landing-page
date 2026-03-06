export type AuthToken = {
  tokenType: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

type StoredAuth = {
  token?: AuthToken;
};

export type PendingOtpContext = {
  country_code: string;
  phone_number: string;
  flowType: "register" | "login";
};

const AUTH_STORAGE_KEY = "planlark.auth";
const PENDING_OTP_KEY = "planlark.pendingOtp";

export function getStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function setAuthToken(token: AuthToken) {
  const next: StoredAuth = { token };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAccessToken(): string | null {
  return getStoredAuth()?.token?.accessToken ?? null;
}

export function setPendingOtpContext(ctx: PendingOtpContext) {
  sessionStorage.setItem(PENDING_OTP_KEY, JSON.stringify(ctx));
}

export function getPendingOtpContext(): PendingOtpContext | null {
  try {
    const raw = sessionStorage.getItem(PENDING_OTP_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingOtpContext;
  } catch {
    return null;
  }
}

export function clearPendingOtpContext() {
  sessionStorage.removeItem(PENDING_OTP_KEY);
}

