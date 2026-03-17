export type AuthToken = {
  tokenType: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

export type VerifiedUser = {
  country_code: string;
  phone_number: string;
};

export type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  country_code: string;
  phone_number: string;
  profile?: string;
  needs_onboarding?: boolean;
  // and other fields returned by api...
};

export type Subscription = {
  tier: "free" | "premium";
  isActive: boolean;
  expiryDate: string | null;
  maxPlans: number;
  createdPlans: number;
  remainingFreePlans: number;
  canCreateMorePlans: boolean;
};

type StoredAuth = {
  token?: AuthToken;
  user?: UserProfile;
  subscription?: Subscription;
};

export type PendingOtpContext = {
  country_code: string;
  phone_number: string;
  flowType: "register" | "login";
};

const AUTH_STORAGE_KEY = "planlark.auth";
const PENDING_OTP_KEY = "planlark.pendingOtp";
const VERIFIED_USER_KEY = "planlark.verifiedUser";

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
  const existing = getStoredAuth() || {};
  const next: StoredAuth = { ...existing, token };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
}

export function setUser(user: UserProfile) {
  const existing = getStoredAuth() || {};
  const next: StoredAuth = { ...existing, user };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
}

export function getUser(): UserProfile | null {
  return getStoredAuth()?.user ?? null;
}

export function setSubscription(subscription: Subscription) {
  const existing = getStoredAuth() || {};
  const next: StoredAuth = { ...existing, subscription };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
}

export function getSubscription(): Subscription | null {
  return getStoredAuth()?.subscription ?? null;
}

export function clearAuth() {
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

export function setVerifiedUser(user: VerifiedUser) {
  sessionStorage.setItem(VERIFIED_USER_KEY, JSON.stringify(user));
}

export function getVerifiedUser(): VerifiedUser | null {
  try {
    const raw = sessionStorage.getItem(VERIFIED_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VerifiedUser;
  } catch {
    return null;
  }
}

export function clearVerifiedUser() {
  sessionStorage.removeItem(VERIFIED_USER_KEY);
}

