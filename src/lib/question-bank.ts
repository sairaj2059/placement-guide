import type { Area } from "./store";

export interface McqQuestion {
  id: string;
  area: Area;
  topic: string;
  difficulty: "Easy" | "Medium" | "Interview";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questionBank: McqQuestion[] = [
  // Python
  {
    id: "py-1",
    area: "Python",
    topic: "Data structures",
    difficulty: "Easy",
    prompt: "Which structure gives O(1) average-case lookup by key?",
    options: ["list", "tuple", "dict", "set of tuples"],
    correctIndex: 2,
    explanation: "Dicts are hash tables — average O(1) lookup, insert, and delete by key.",
  },
  {
    id: "py-2",
    area: "Python",
    topic: "Mutability",
    difficulty: "Medium",
    prompt: "What does this print?\ndef f(lst=[]):\n    lst.append(1)\n    return lst\nprint(f()); print(f())",
    options: ["[1] then [1]", "[1] then [1, 1]", "Error on second call", "[1,1] then [1,1]"],
    correctIndex: 1,
    explanation:
      "Default mutable arguments are created once at function definition, not per call — the same list object persists across calls. Classic interview gotcha.",
  },
  {
    id: "py-3",
    area: "Python",
    topic: "Pandas",
    difficulty: "Medium",
    prompt: "df.groupby('user_id')['amount'].transform('sum') vs .agg('sum') — what's the key difference?",
    options: [
      "transform is faster, always",
      "agg returns a Series indexed by group keys; transform returns a Series aligned to the original index (broadcast back)",
      "They are identical",
      "transform only works on numeric columns",
    ],
    correctIndex: 1,
    explanation:
      "transform broadcasts the aggregated result back to every row of the original frame — useful for creating a 'group total' column without a separate merge.",
  },
  // SQL
  {
    id: "sql-1",
    area: "SQL",
    topic: "Joins",
    difficulty: "Easy",
    prompt: "Which join keeps all rows from the left table regardless of a match?",
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
    correctIndex: 1,
    explanation: "LEFT JOIN preserves every left-table row, filling unmatched right-side columns with NULL.",
  },
  {
    id: "sql-2",
    area: "SQL",
    topic: "Window functions",
    difficulty: "Medium",
    prompt: "RANK() and DENSE_RANK() differ in that:",
    options: [
      "RANK() skips numbers after a tie, DENSE_RANK() doesn't",
      "DENSE_RANK() skips numbers after a tie, RANK() doesn't",
      "They always return the same values",
      "RANK() requires an ORDER BY, DENSE_RANK() doesn't",
    ],
    correctIndex: 0,
    explanation:
      "With a tie at rank 2, RANK() jumps to 4 for the next row (leaving a gap for the tied rows), while DENSE_RANK() continues at 3.",
  },
  {
    id: "sql-3",
    area: "SQL",
    topic: "Aggregation",
    difficulty: "Medium",
    prompt: "WHERE vs HAVING — which is correct?",
    options: [
      "WHERE filters after aggregation, HAVING before",
      "HAVING filters rows before GROUP BY, WHERE after",
      "WHERE filters rows before grouping, HAVING filters groups after aggregation",
      "They're interchangeable",
    ],
    correctIndex: 2,
    explanation:
      "WHERE operates on raw rows before GROUP BY runs; HAVING operates on the aggregated groups, so it can reference aggregate functions like COUNT(*) or SUM(x).",
  },
  // DSA
  {
    id: "dsa-1",
    area: "DSA",
    topic: "Sliding window",
    difficulty: "Medium",
    prompt: "Best approach for 'longest substring without repeating characters'?",
    options: [
      "Brute-force all substrings, O(n^3)",
      "Sliding window with a hash set, O(n)",
      "Sort the string first",
      "Dynamic programming over all pairs",
    ],
    correctIndex: 1,
    explanation:
      "A sliding window with two pointers and a set/map to track seen characters expands and contracts in O(n) total, since each character is added and removed at most once.",
  },
  {
    id: "dsa-2",
    area: "DSA",
    topic: "Big-O",
    difficulty: "Easy",
    prompt: "Time complexity of binary search on a sorted array of size n?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
    explanation: "Each comparison halves the search space, giving O(log n) comparisons.",
  },
  {
    id: "dsa-3",
    area: "DSA",
    topic: "Hash maps",
    difficulty: "Easy",
    prompt: "Two Sum: given a target, the O(n) approach uses:",
    options: [
      "Nested loop checking all pairs",
      "Sort then two pointers (loses original indices unless tracked)",
      "A hash map storing value → index, checked while iterating once",
      "Binary search for every element",
    ],
    correctIndex: 2,
    explanation:
      "Iterate once, and for each element check if (target - element) is already in the map; if not, insert the current element. Single pass, O(n).",
  },
  // Statistics
  {
    id: "stat-1",
    area: "Statistics",
    topic: "Hypothesis testing",
    difficulty: "Medium",
    prompt: "A p-value of 0.03 means:",
    options: [
      "There's a 3% chance the null hypothesis is true",
      "There's a 3% chance of observing data this extreme (or more) if the null hypothesis were true",
      "The effect size is 3%",
      "97% confidence the alternative hypothesis is correct",
    ],
    correctIndex: 1,
    explanation:
      "p-value is P(data this extreme | H0 true) — a statement about the data given the null, not a probability statement about the hypothesis itself. This distinction is a common interview trap.",
  },
  {
    id: "stat-2",
    area: "Statistics",
    topic: "Distributions",
    difficulty: "Easy",
    prompt: "The Central Limit Theorem says the sampling distribution of the mean approaches:",
    options: [
      "The same distribution as the population",
      "A normal distribution, as sample size grows, regardless of the population's distribution",
      "A uniform distribution",
      "A Poisson distribution",
    ],
    correctIndex: 1,
    explanation:
      "CLT holds for most population distributions with finite variance — it's why so many statistical tests assume normality of sample means even with skewed underlying data.",
  },
  {
    id: "stat-3",
    area: "Statistics",
    topic: "Errors",
    difficulty: "Medium",
    prompt: "In a medical screening test, a Type II error means:",
    options: [
      "Rejecting a true null (false positive: healthy person flagged as sick)",
      "Failing to reject a false null (false negative: sick person flagged as healthy)",
      "The test has no error",
      "The sample size was too large",
    ],
    correctIndex: 1,
    explanation:
      "Type II = false negative. In screening, this is often the costlier error — missing an actual case — which is why recall/sensitivity matters more than raw accuracy in this context.",
  },
  // Machine Learning
  {
    id: "ml-1",
    area: "Machine Learning",
    topic: "Evaluation",
    difficulty: "Interview",
    prompt: "A fraud model has 99.4% accuracy but recall of 0.12 on the fraud class. What's happening?",
    options: [
      "The model is excellent — high accuracy is what matters",
      "Severe class imbalance: predicting 'not fraud' for everything gives high accuracy while missing almost all real fraud",
      "The model has a bug in feature scaling",
      "Recall is the wrong metric here",
    ],
    correctIndex: 1,
    explanation:
      "With rare positive classes, accuracy is dominated by the majority class. Precision/recall, PR-AUC, or F1 on the minority class reveal the real picture.",
  },
  {
    id: "ml-2",
    area: "Machine Learning",
    topic: "Bias-variance",
    difficulty: "Medium",
    prompt: "97% training accuracy, 71% validation accuracy most likely indicates:",
    options: ["Underfitting", "Overfitting", "Data leakage in validation set", "Perfectly calibrated model"],
    correctIndex: 1,
    explanation:
      "A large train-validation gap is the classic overfitting signature — the model has memorized training patterns that don't generalize. Regularization, more data, or simpler models are the usual fixes.",
  },
  {
    id: "ml-3",
    area: "Machine Learning",
    topic: "Regularization",
    difficulty: "Interview",
    prompt: "L1 vs L2 regularization — what's the key structural difference in the resulting coefficients?",
    options: [
      "L1 tends to produce sparse coefficients (some exactly zero); L2 shrinks all coefficients smoothly toward zero",
      "L2 produces sparse coefficients; L1 shrinks smoothly",
      "Both produce identical coefficient patterns",
      "L1 only works for classification, L2 only for regression",
    ],
    correctIndex: 0,
    explanation:
      "L1's diamond-shaped constraint region has corners on the axes, which is geometrically why solutions land exactly at zero for some features — effectively doing feature selection.",
  },
  // Deep Learning
  {
    id: "dl-1",
    area: "Deep Learning",
    topic: "Optimization",
    difficulty: "Medium",
    prompt: "Vanishing gradients in deep networks are most directly caused by:",
    options: [
      "Too much training data",
      "Repeated multiplication of small derivatives (e.g. from sigmoid/tanh) across many layers during backprop",
      "Using ReLU activation",
      "Batch size being too large",
    ],
    correctIndex: 1,
    explanation:
      "Chain-rule multiplication of many small gradients shrinks the signal exponentially with depth. ReLU, residual connections, and batch norm all exist partly to combat this.",
  },
  {
    id: "dl-2",
    area: "Deep Learning",
    topic: "Regularization",
    difficulty: "Easy",
    prompt: "Dropout during training works by:",
    options: [
      "Removing entire layers permanently",
      "Randomly zeroing a fraction of activations each forward pass, forcing redundant representations",
      "Increasing the learning rate",
      "Adding more training data",
    ],
    correctIndex: 1,
    explanation:
      "Random zeroing prevents co-adaptation of neurons, acting like an implicit ensemble of subnetworks. It's disabled at inference time (with activation scaling to compensate).",
  },
  {
    id: "dl-3",
    area: "Deep Learning",
    topic: "Architectures",
    difficulty: "Interview",
    prompt: "Why do transformers use positional encodings?",
    options: [
      "To reduce the number of parameters",
      "Self-attention has no inherent notion of sequence order, so position must be injected explicitly",
      "To speed up training",
      "To replace the need for an embedding layer",
    ],
    correctIndex: 1,
    explanation:
      "Attention treats input as an unordered set of tokens by default — positional encodings (sinusoidal or learned) give the model the sequence information that RNNs get for free from their recurrence.",
  },
  // Specialization / MLOps / Healthcare AI — shared pool for now, split out
  // into dedicated CV/NLP/Healthcare/MLOps areas once the specialization
  // hub gets its own build-out.
  {
    id: "spec-1",
    area: "Specialization",
    topic: "MLOps",
    difficulty: "Medium",
    prompt: "What's the main purpose of a feature store in an ML platform?",
    options: [
      "To store trained model weights",
      "To serve consistent, versioned features to both training and online inference, avoiding training-serving skew",
      "To replace a data warehouse entirely",
      "To visualize model metrics",
    ],
    correctIndex: 1,
    explanation:
      "Training-serving skew — where offline features differ subtly from what's computed online — is one of the most common causes of a model performing worse in production than in evaluation. A feature store centralizes the computation so both paths agree.",
  },
  {
    id: "spec-2",
    area: "Specialization",
    topic: "Clinical NLP",
    difficulty: "Medium",
    prompt: "Why is de-identification of clinical text harder than standard PII redaction?",
    options: [
      "Clinical text is always structured, so it's actually easier",
      "PHI appears in unpredictable free-text forms (e.g. a doctor's note mentioning a date, location, or rare condition inline) that simple pattern-matching misses",
      "Clinical text never contains names",
      "It isn't harder — the same regex rules apply",
    ],
    correctIndex: 1,
    explanation:
      "Structured PII (SSNs, phone numbers) matches patterns well; free-text clinical notes need NER models trained to catch names, dates, and locations embedded in natural sentences, plus handle abbreviations and typos.",
  },
  {
    id: "spec-3",
    area: "Specialization",
    topic: "Medical Imaging",
    difficulty: "Interview",
    prompt: "A chest X-ray classifier performs well on its hospital's data but poorly at a new hospital. Most likely cause?",
    options: [
      "The model architecture is too small",
      "Domain shift — differences in scanner hardware, imaging protocol, or patient population between sites change the input distribution",
      "The learning rate was too high during training",
      "Medical images can't be classified by CNNs",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most cited failure modes in medical imaging ML: models learn site-specific artifacts (scanner type, positioning conventions) alongside the actual pathology signal, and generalization across sites requires explicit domain adaptation or multi-site training data.",
  },
  {
    id: "spec-4",
    area: "Specialization",
    topic: "PHI / PII compliance",
    difficulty: "Medium",
    prompt: "Under HIPAA's Safe Harbor method, which of these must be removed to consider data de-identified?",
    options: [
      "Only the patient's name",
      "18 specific identifier categories, including names, dates (except year), geographic subdivisions smaller than a state, and medical record numbers",
      "Nothing — HIPAA only restricts data sharing, not data content",
      "Only identifiers that are longer than 8 characters",
    ],
    correctIndex: 1,
    explanation:
      "Safe Harbor lists 18 identifier categories that must all be stripped or generalized. This is worth knowing precisely for healthcare AI interviews — 'we removed the name' is not de-identification.",
  },
];

export function getQuestionsByArea(area: Area) {
  return questionBank.filter((q) => q.area === area);
}

// A short, mixed diagnostic used at onboarding — 2 per core area, skipping
// the deepest specialization questions so it takes ~8-10 minutes, not longer.
export function getDiagnosticSet(): McqQuestion[] {
  const areas: Area[] = ["Python", "SQL", "DSA", "Statistics", "Machine Learning", "Deep Learning"];
  return areas.flatMap((area) => getQuestionsByArea(area).slice(0, 2));
}
