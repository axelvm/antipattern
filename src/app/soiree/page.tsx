"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Atmosphere } from "@/components/Atmosphere";
import { SoireeRoom } from "@/components/SoireeRoom";
import { getSession, subscribeSession } from "@/lib/auth";
import { unlockSoireeQuest } from "@/lib/quests";

export default function SoireePage() {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeSession, getSession, () => null);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
      return;
    }
    unlockSoireeQuest();
  }, [router]);

  if (!session) {
    return (
      <Atmosphere dim>
        <main className="flex flex-1 items-center justify-center px-6">
          <p className="font-[family-name:var(--font-mono)] text-sm text-fog/60">
            La porte s&apos;ouvre…
          </p>
        </main>
      </Atmosphere>
    );
  }

  return <SoireeRoom />;
}
