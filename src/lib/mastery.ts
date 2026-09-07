import type { Mastery } from "./store";

export const masteryLabel: Record<Mastery, string> = {
  L0: "Not started",
  L1: "Recognition",
  L2: "Conceptual",
  L3: "Applied",
  L4: "Interview ready",
  L5: "Advanced",
};

export const masteryColor: Record<Mastery, string> = {
  L0: "text-[#8b91a3] border-[#3a4054]",
  L1: "text-[#8b91a3] border-[#3a4054]",
  L2: "text-[#e8a33d] border-[#e8a33d]/40",
  L3: "text-[#e8a33d] border-[#e8a33d]/40",
  L4: "text-[#3ddc97] border-[#3ddc97]/40",
  L5: "text-[#3ddc97] border-[#3ddc97]/40",
};

// Maps a quiz score (0-1) to the mastery level it demonstrates. A single
// quiz can only ever prove up to L4 — L5 ("advanced/research-level
// discussion") isn't something a multiple-choice quiz can certify.
export function masteryFromScore(fraction: number): Mastery {
  if (fraction >= 0.85) return "L4";
  if (fraction >= 0.65) return "L3";
  if (fraction >= 0.4) return "L2";
  if (fraction > 0) return "L1";
  return "L0";
}
