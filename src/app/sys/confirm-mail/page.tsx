import type { Metadata } from "next";
import { ConfirmMailForm, ConfirmMailPageShell } from "@/components/ConfirmMailForm";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Confirmation",
  robots: { index: false, follow: false },
};

export default function ConfirmMailPage() {
  return (
    <ConfirmMailPageShell>
      <ConfirmMailForm />
    </ConfirmMailPageShell>
  );
}
