import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { LoveExperience } from "@/components/LoveExperience";

export const metadata: Metadata = {
  title: "ANTIPATTERN — La quête de l'élue",
  description: "Like ou dislike chaque profil. Un seul like compte vraiment.",
};

export default function LovePage() {
  return (
    <Atmosphere dim>
      <LoveExperience />
    </Atmosphere>
  );
}
