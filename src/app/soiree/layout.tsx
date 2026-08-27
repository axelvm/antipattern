import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANTIPATTERN — Soirée d'enfer",
  description: "Salon en vue du dessus. Cliquez les objets. Déboutonnez la chemise de Guillaume.",
};

export default function SoireeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
