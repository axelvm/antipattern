"use client";

import { useSearchParams } from "next/navigation";

export function LoginNotice() {
  const params = useSearchParams();
  if (params.get("inscrit") !== "1") return null;

  return (
    <p
      role="status"
      className="mb-6 max-w-md text-center text-sm text-[var(--lamp)]"
    >
      Compte créé. Vous pouvez vous connecter.
    </p>
  );
}
