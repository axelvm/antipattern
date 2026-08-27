"use client";

import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { WeddingReward } from "@/components/WeddingReward";
import {
  QUEST_CATALOG,
  type QuestId,
  getQuestsSnapshot,
  isQuestSolved,
  submitQuestFlag,
  subscribeQuests,
} from "@/lib/quests";

function QuestRow({
  id,
  title,
  href,
  solved,
}: {
  id: QuestId;
  title: string;
  href: string;
  solved: boolean;
}) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const done = solved || accepted;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitQuestFlag(id, value);
    if (!result.ok) {
      setAccepted(false);
      setMessage(result.message);
      return;
    }
    setAccepted(true);
    setMessage("Flag accepté.");
    setValue("");
  }

  return (
    <tr className="border-t border-white/10">
      <td className="px-4 py-3 align-top">
        <Link
          href={href}
          className="text-fog underline-offset-2 hover:text-white hover:underline"
        >
          {title}
        </Link>
      </td>
      <td className="px-4 py-3 align-top font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--lamp)]">
        {done ? "validée" : "disponible"}
      </td>
      <td className="px-4 py-3 align-top">
        {done ? (
          <p className="text-xs text-fog/50">Complétée</p>
        ) : (
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
            <input
              name={`flag-${id}`}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="flag"
              className="min-w-0 flex-1 border border-white/15 bg-black px-2.5 py-1.5 text-xs text-white outline-none placeholder:text-white/25"
            />
            <button
              type="submit"
              className="shrink-0 bg-white px-3 py-1.5 font-[family-name:var(--font-display)] text-xs font-bold tracking-wide text-black"
            >
              Valider
            </button>
          </form>
        )}
        {message ? (
          <p className={`mt-1.5 text-xs ${done ? "text-[var(--lamp)]" : "text-[#e8a06a]"}`}>
            {message}
          </p>
        ) : null}
      </td>
    </tr>
  );
}

export function QuestBoard() {
  const snapshot = useSyncExternalStore(
    subscribeQuests,
    getQuestsSnapshot,
    () => ({ unlocked: [], solved: [] }),
  );

  const unlocked = QUEST_CATALOG.filter((quest) =>
    snapshot.unlocked.includes(quest.id),
  );

  return (
    <section id="quetes" className="mt-12 w-full max-w-2xl scroll-mt-8">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-fog">
        Tableau des quêtes
      </h2>
      <div className="mt-4 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm text-fog/80">
          <thead className="bg-white/5 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-fog/45">
            <tr>
              <th className="px-4 py-3 font-medium">Quête</th>
              <th className="px-4 py-3 font-medium">État</th>
              <th className="px-4 py-3 font-medium">Flag</th>
            </tr>
          </thead>
          <tbody>
            {unlocked.length === 0 ? (
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 text-fog/45" colSpan={3}>
                  Aucune quête pour le moment.
                </td>
              </tr>
            ) : (
              unlocked.map((quest) => (
                <QuestRow
                  key={quest.id}
                  id={quest.id}
                  title={quest.title}
                  href={quest.href}
                  solved={isQuestSolved(quest.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <WeddingReward />
    </section>
  );
}
