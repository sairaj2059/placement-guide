export const student = {
  name: "Ananya",
  targetRole: "Data Scientist",
  specialization: "Healthcare AI",
  week: 3,
  totalWeeks: 8,
  day: 17,
  totalDays: 56,
  streak: 6,
  overallReadiness: 61,
};

export const readinessBreakdown = [
  { area: "Python", score: 72 },
  { area: "SQL", score: 48 },
  { area: "Statistics", score: 67 },
  { area: "Mathematics", score: 63 },
  { area: "Machine Learning", score: 74 },
  { area: "Deep Learning", score: 58 },
  { area: "DSA", score: 42 },
  { area: "Specialization (Healthcare AI)", score: 55 },
  { area: "Interview Communication", score: 51 },
  { area: "Project Defense", score: 39 },
];

export const weakestAreas = [
  { topic: "SQL — Window Functions", reason: "3 failed attempts, last practiced 9 days ago" },
  { topic: "DSA — Sliding Window", reason: "Never solved unaided" },
  { topic: "Statistical Hypothesis Testing", reason: "Explains definition, fails application" },
  { topic: "Project Defense — Trade-offs", reason: "No mock defense completed yet" },
];

export const todayPlan = [
  { id: 1, task: "Logistic Regression — quick revision + scenario", minutes: 35, done: true },
  { id: 2, task: "SQL Window Functions — 4 problems", minutes: 45, done: false },
  { id: 3, task: "Python: hash map problem set", minutes: 30, done: false },
  { id: 4, task: "ML interview questions (weak-topic set)", minutes: 20, done: false },
  { id: 5, task: "Project defense — 1 trade-off question", minutes: 15, done: false },
];

export const practiceCategories = [
  { name: "Python", count: 128 },
  { name: "SQL", count: 96 },
  { name: "DSA", count: 74 },
  { name: "Statistics", count: 58 },
  { name: "Machine Learning", count: 110 },
  { name: "Deep Learning", count: 64 },
  { name: "Healthcare AI", count: 32 },
];

export const sampleQuestions = [
  {
    id: "sql-window-1",
    topic: "SQL",
    difficulty: "Medium",
    skill: "Window functions",
    time: "12 min",
    prompt:
      "Given a `transactions` table (user_id, amount, txn_date), write a query returning each user's running total of amount ordered by txn_date.",
  },
  {
    id: "ml-imbalance-1",
    topic: "Machine Learning",
    difficulty: "Interview",
    skill: "Evaluation metrics",
    time: "8 min",
    prompt:
      "A fraud model has 99.4% accuracy but a recall of 0.12 on the fraud class. Explain why accuracy is misleading here and propose two better metrics.",
  },
  {
    id: "py-hashmap-1",
    topic: "Python",
    difficulty: "Easy",
    skill: "Hash maps",
    time: "10 min",
    prompt:
      "Given a list of transaction amounts, return the first amount that repeats. Aim for O(n) time.",
  },
];
