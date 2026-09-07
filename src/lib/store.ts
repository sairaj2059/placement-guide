"use client";

// All persistence is client-side localStorage — there's no backend on
// GitHub Pages. This is a real, working data layer (not mock data you have
// to imagine wiring up) but it's per-browser: clearing site data resets it,
// and it doesn't sync across devices. Swap this module for real API calls
// if/when you add a backend (see README).

export type Area =
  | "Python"
  | "SQL"
  | "DSA"
  | "Statistics"
  | "Mathematics"
  | "Machine Learning"
  | "Deep Learning"
  | "Specialization"
  | "Interview Communication"
  | "Project Defense";

export type Mastery = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export interface Profile {
  name: string;
  targetRole: string;
  specialization: string;
  hoursPerDay: number;
  onboarded: boolean;
  onboardedAt?: string;
}

export interface Attempt {
  id: string;
  questionId: string;
  area: Area;
  topic: string;
  correct: boolean;
  timestamp: string;
}

export interface Mistake {
  id: string;
  question: string;
  topic: string;
  area: Area;
  category: string;
  timestamp: string;
}

export interface TopicMastery {
  [slug: string]: Mastery;
}

export interface FlashcardState {
  id: string;
  box: 1 | 2 | 3 | 4 | 5; // Leitner box — higher box = longer interval
  lastReviewed?: string;
  dueAt: string;
}

export interface InterviewAttempt {
  id: string;
  roleType: string;
  roundType: string;
  question: string;
  selfScore: number; // 1-5 self-rating against the model answer
  timestamp: string;
}

interface StoreShape {
  profile: Profile | null;
  attempts: Attempt[];
  mistakes: Mistake[];
  topicMastery: TopicMastery;
  flashcards: FlashcardState[];
  interviewAttempts: InterviewAttempt[];
  streak: number;
  lastActiveDate?: string;
}

const KEY = "signal_store_v1";

const defaultStore: StoreShape = {
  profile: null,
  attempts: [],
  mistakes: [],
  topicMastery: {},
  flashcards: [],
  interviewAttempts: [],
  streak: 0,
};

function read(): StoreShape {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultStore;
    return { ...defaultStore, ...JSON.parse(raw) };
  } catch {
    return defaultStore;
  }
}

function write(store: StoreShape) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("signal-store-updated"));
}

export function getStore(): StoreShape {
  return read();
}

export function saveProfile(profile: Omit<Profile, "onboarded" | "onboardedAt">) {
  const store = read();
  store.profile = { ...profile, onboarded: true, onboardedAt: new Date().toISOString() };
  write(store);
}

export function recordAttempt(attempt: Omit<Attempt, "id" | "timestamp">) {
  const store = read();
  store.attempts.push({
    ...attempt,
    id: `${attempt.questionId}-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
  bumpStreak(store);
  write(store);
}

export function logMistake(mistake: Omit<Mistake, "id" | "timestamp">) {
  const store = read();
  store.mistakes.push({
    ...mistake,
    id: `${mistake.topic}-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
  write(store);
}

export function setTopicMastery(slug: string, mastery: Mastery) {
  const store = read();
  store.topicMastery[slug] = mastery;
  write(store);
}

export function recordInterviewAttempt(attempt: Omit<InterviewAttempt, "id" | "timestamp">) {
  const store = read();
  store.interviewAttempts.push({
    ...attempt,
    id: `iv-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
  write(store);
}

function bumpStreak(store: StoreShape) {
  const today = new Date().toDateString();
  if (store.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  store.streak = store.lastActiveDate === yesterday ? store.streak + 1 : 1;
  store.lastActiveDate = today;
}

// --- Spaced repetition (Leitner system) ---
const BOX_INTERVAL_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 } as const;

export function reviewFlashcard(id: string, remembered: boolean) {
  const store = read();
  let card = store.flashcards.find((c) => c.id === id);
  if (!card) {
    card = { id, box: 1, dueAt: new Date().toISOString() };
    store.flashcards.push(card);
  }
  card.box = remembered ? (Math.min(5, card.box + 1) as FlashcardState["box"]) : 1;
  card.lastReviewed = new Date().toISOString();
  const days = BOX_INTERVAL_DAYS[card.box];
  card.dueAt = new Date(Date.now() + days * 86400000).toISOString();
  write(store);
}

export function getDueFlashcardIds(allIds: string[]): string[] {
  const store = read();
  const now = Date.now();
  return allIds.filter((id) => {
    const card = store.flashcards.find((c) => c.id === id);
    if (!card) return true; // never reviewed = due
    return new Date(card.dueAt).getTime() <= now;
  });
}

// --- Readiness computation ---
// Real formula, not a hardcoded number: accuracy on recent attempts per
// area, weighted toward recency, with a small penalty for areas that
// haven't been practiced at all yet.
export function computeReadinessByArea(): Record<Area, number> {
  const store = read();
  const areas: Area[] = [
    "Python",
    "SQL",
    "DSA",
    "Statistics",
    "Mathematics",
    "Machine Learning",
    "Deep Learning",
    "Specialization",
    "Interview Communication",
    "Project Defense",
  ];

  const result = {} as Record<Area, number>;
  for (const area of areas) {
    const areaAttempts = store.attempts.filter((a) => a.area === area);
    if (areaAttempts.length === 0) {
      result[area] = 0;
      continue;
    }
    const recent = areaAttempts.slice(-12);
    const correct = recent.filter((a) => a.correct).length;
    const accuracy = correct / recent.length;
    // volume factor: fewer than 8 attempts caps the score, so a lucky
    // streak on 2 questions can't read as "mastered"
    const volumeFactor = Math.min(1, recent.length / 8);
    result[area] = Math.round(accuracy * 100 * (0.4 + 0.6 * volumeFactor));
  }
  return result;
}

export function computeOverallReadiness(): number {
  const byArea = computeReadinessByArea();
  const values = Object.values(byArea);
  const practiced = values.filter((v) => v > 0);
  if (practiced.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function readinessLevel(score: number) {
  if (score <= 30) return "Foundation needed";
  if (score <= 50) return "Developing";
  if (score <= 70) return "Interview preparation";
  if (score <= 85) return "Interview ready";
  return "Placement ready";
}
