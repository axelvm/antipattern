"use client";

import type { RegisterInput } from "@/lib/auth";

const PENDING_KEY = "antipattern.pendingRegistration";

export function savePendingRegistration(data: RegisterInput) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(data));
}

export function getPendingRegistration(): RegisterInput | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RegisterInput;
    if (
      !parsed?.email ||
      !parsed?.password ||
      !parsed?.lastName ||
      !parsed?.firstName
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingRegistration() {
  sessionStorage.removeItem(PENDING_KEY);
}

/** Path of the hidden email confirmation page linked from the CGU. */
export const EMAIL_VALIDATION_PATH = "/sys/confirm-mail";
