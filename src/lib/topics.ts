import type { Area } from "./store";

export interface TopicContent {
  slug: string;
  name: string;
  category: "Core Data Science" | "Specialization — Healthcare AI";
  importance: "Critical" | "High" | "Medium";
  quizArea: Area | null; // null = no quiz bank wired yet for this topic
  quickRevision: string;
  coreConcepts: string[];
  mathIntuition: string;
  example: string;
  implementation: { language: "python" | "sql"; code: string };
  commonMistakes: string[];
  interviewQuestions: string[];
  scenarioQuestion: string;
}

export const topics: TopicContent[] = [
  {
    slug: "python",
    name: "Python",
    category: "Core Data Science",
    importance: "Critical",
    quizArea: "Python",
    quickRevision:
      "Python is the primary language across the DS interview loop: data manipulation (pandas/numpy), algorithmic coding questions, and quick scripting. Interviewers test fluency with core data structures and common gotchas more than language trivia.",
    coreConcepts: [
      "Dicts and sets are hash tables — O(1) average lookup; lists are O(n) for 'in' checks.",
      "Mutable default arguments (def f(x=[])) persist across calls — a frequent bug source.",
      "List/dict comprehensions are the idiomatic replacement for most manual for-loops.",
      "pandas groupby + agg/transform/apply cover most tabular aggregation questions.",
      "Generators (yield) avoid materializing large sequences in memory.",
    ],
    mathIntuition:
      "Less about math, more about complexity reasoning: know the time complexity of the operation you reach for. Iterating a list to check membership is O(n) per check — for n checks that's O(n²); converting to a set first makes each check O(1), for O(n) total.",
    example:
      "Deduplicating and counting the top-5 most frequent categories in a 10M-row column: use pandas value_counts() (vectorized, C-backed) rather than a Python for-loop with a manual dict — orders of magnitude faster.",
    implementation: {
      language: "python",
      code: `import pandas as pd

# Idiomatic aggregation: total spend per user, sorted descending
summary = (
    df.groupby("user_id")["amount"]
      .agg(total="sum", txns="count")
      .sort_values("total", ascending=False)
)

# Broadcast a group total back onto every row (no separate merge needed)
df["user_total"] = df.groupby("user_id")["amount"].transform("sum")`,
    },
    commonMistakes: [
      "Using a mutable default argument and being surprised state persists between calls.",
      "Looping over pandas rows with iterrows() instead of vectorized operations — 10-100x slower.",
      "Confusing is with == for value comparison (is checks identity, not equality).",
      "Modifying a list while iterating over it, causing skipped elements.",
    ],
    interviewQuestions: [
      "What's the time complexity difference between checking membership in a list vs a set?",
      "Why does a mutable default argument behave unexpectedly across function calls?",
      "When would you use a generator instead of a list?",
      "How does pandas .apply() differ from a vectorized operation in performance?",
    ],
    scenarioQuestion:
      "Your data pipeline script processes a 50M-row CSV and takes 40 minutes. A colleague says 'just use pandas .apply()' everywhere. What would you check before accepting that advice?",
  },
  {
    slug: "sql",
    name: "SQL",
    category: "Core Data Science",
    importance: "Critical",
    quizArea: "SQL",
    quickRevision:
      "SQL interviews test whether you can translate a business question into a correct, efficient query — joins, aggregation, and window functions are the core toolkit. Most DS SQL rounds are 3-5 progressively harder business questions on the same schema.",
    coreConcepts: [
      "Execution order is conceptually: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY — this explains why HAVING can use aggregates but WHERE can't.",
      "Window functions (OVER, PARTITION BY) compute per-row values without collapsing rows the way GROUP BY does.",
      "CTEs (WITH ... AS) make multi-step logic readable and are often required for cohort/retention analysis.",
      "LEFT JOIN + IS NULL is the standard pattern for 'find rows in A with no match in B'.",
    ],
    mathIntuition:
      "Window functions like RANK() OVER (PARTITION BY category ORDER BY score DESC) conceptually 'freeze' the row set, sort within each partition, and assign a rank — without reducing the row count, unlike GROUP BY which collapses to one row per group.",
    example:
      "Cohort retention: for each signup month, what % of users made a purchase in month+1? This needs a self-join or window function comparing each user's signup date to their transaction dates, bucketed by month offset.",
    implementation: {
      language: "sql",
      code: `-- Running total of spend per user, ordered by date
SELECT
  user_id,
  txn_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY user_id ORDER BY txn_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM transactions;

-- Top-2 transactions per user by amount, ties handled with RANK
WITH ranked AS (
  SELECT *, RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rnk
  FROM transactions
)
SELECT * FROM ranked WHERE rnk <= 2;`,
    },
    commonMistakes: [
      "Putting an aggregate condition in WHERE instead of HAVING (e.g. WHERE COUNT(*) > 5 — invalid).",
      "Forgetting PARTITION BY in a window function, applying it across the whole table instead of per group.",
      "Using COUNT(column) when NULLs should be counted — COUNT(column) skips NULLs, COUNT(*) doesn't.",
      "Self-joins without disambiguating aliases, causing ambiguous column errors or silent wrong joins.",
    ],
    interviewQuestions: [
      "What's the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?",
      "Why can't you reference a SELECT alias inside the WHERE clause of the same query?",
      "How would you find the second-highest salary per department without LIMIT/OFFSET?",
      "Explain the difference between a CTE and a subquery — when would you prefer one?",
    ],
    scenarioQuestion:
      "A stakeholder asks for 'month-over-month active user growth.' Walk through how you'd define 'active,' structure the query, and what edge case (e.g. users active in month 1 but not the platform's first month) could silently produce a wrong answer.",
  },
  {
    slug: "dsa",
    name: "Data Structures & Algorithms",
    category: "Core Data Science",
    importance: "High",
    quizArea: "DSA",
    quickRevision:
      "DS interviews rarely need graph theory depth — they test whether you can recognize the right pattern (hash map, sliding window, two pointers) quickly and implement it cleanly in Python, usually on arrays, strings, or dicts.",
    coreConcepts: [
      "Hash maps convert O(n²) brute-force pair/lookup problems into O(n).",
      "Sliding window handles 'longest/shortest subarray/substring satisfying X' in O(n) instead of O(n²) or O(n³).",
      "Two pointers work on sorted arrays for pair-sum style problems in O(n) after an O(n log n) sort.",
      "Recognize the pattern from the problem shape before coding — most DS-round questions map to one of a handful of templates.",
    ],
    mathIntuition:
      "Sliding window correctness: the window only ever expands or contracts, and each index enters and leaves the window at most once — so total work across the whole array is O(n), even though it looks like nested loops.",
    example:
      "Given a stream of transaction amounts, find the longest run of consecutive transactions summing to less than a budget — classic sliding window: expand right, shrink left when the window sum exceeds budget.",
    implementation: {
      language: "python",
      code: `def longest_window_under_budget(amounts, budget):
    left = 0
    window_sum = 0
    best = 0
    for right, amt in enumerate(amounts):
        window_sum += amt
        while window_sum > budget and left <= right:
            window_sum -= amounts[left]
            left += 1
        best = max(best, right - left + 1)
    return best`,
    },
    commonMistakes: [
      "Jumping to code before stating the approach and its complexity out loud — interviewers weight this heavily.",
      "Off-by-one errors at window/pointer boundaries — always trace through a 2-3 element example.",
      "Reaching for brute force under time pressure instead of pausing to recognize the pattern.",
      "Not discussing edge cases (empty input, all-negative values, duplicates) unprompted.",
    ],
    interviewQuestions: [
      "How do you recognize when a problem calls for a sliding window vs two pointers?",
      "What's the space-time tradeoff of using a hash map to solve Two Sum?",
      "When does a greedy approach fail where DP is needed?",
      "How would you test your solution's correctness before submitting, without running it?",
    ],
    scenarioQuestion:
      "You're asked to find the top-k most frequent items in a stream too large to fit in memory. Your first instinct is sort-and-count. What's wrong with that at scale, and what would you propose instead?",
  },
  {
    slug: "statistics",
    name: "Statistics",
    category: "Core Data Science",
    importance: "Critical",
    quizArea: "Statistics",
    quickRevision:
      "Statistics questions probe whether you can reason about uncertainty and inference correctly, not recite formulas. p-values, confidence intervals, and Type I/II errors are tested through their correct interpretation, which is where most candidates lose points.",
    coreConcepts: [
      "p-value = P(data this extreme | H0 true) — not P(H0 true | data). This distinction is tested constantly.",
      "A 95% confidence interval means: if we repeated the sampling process many times, 95% of such intervals would contain the true parameter — not '95% probability the true value is in this interval.'",
      "Type I error (false positive) and Type II error (false negative) trade off against each other via the significance threshold.",
      "The Central Limit Theorem is why so many methods assume normality of sample means even for skewed raw data.",
    ],
    mathIntuition:
      "A two-sample t-test statistic is (x̄₁ - x̄₂) / SE, where SE captures both sample variances and sizes. Larger sample sizes shrink SE, making smaller true differences detectable — which is why 'statistically significant' doesn't imply 'practically meaningful' at large n.",
    example:
      "An A/B test shows a 0.3% conversion lift with p = 0.001 on 5 million users. Statistically significant, but is a 0.3% lift worth the engineering cost of shipping the change? Statistical and practical significance are different questions.",
    implementation: {
      language: "python",
      code: `from scipy import stats

# Two-sample t-test: did the treatment group convert differently?
t_stat, p_value = stats.ttest_ind(control_conversions, treatment_conversions)

# 95% CI for the difference in means
diff = treatment.mean() - control.mean()
se = (control.std(ddof=1)**2/len(control) + treatment.std(ddof=1)**2/len(treatment)) ** 0.5
ci = (diff - 1.96*se, diff + 1.96*se)`,
    },
    commonMistakes: [
      "Interpreting p-value as 'probability the null hypothesis is true.'",
      "Running many tests without correcting for multiple comparisons (p-hacking risk).",
      "Treating statistical significance as automatically meaning practical importance.",
      "Ignoring whether test assumptions (independence, variance homogeneity) actually hold.",
    ],
    interviewQuestions: [
      "Explain what a p-value actually means, in plain language, to a non-technical stakeholder.",
      "What's the difference between Type I and Type II error, and how does adjusting alpha affect both?",
      "Why does increasing sample size make it easier to find statistically significant but practically meaningless effects?",
      "When would you use a non-parametric test instead of a t-test?",
    ],
    scenarioQuestion:
      "Your A/B test hits significance on day 3 of a planned 14-day run. A PM wants to ship immediately. What do you say, and why does stopping early inflate false-positive risk?",
  },
  {
    slug: "logistic-regression",
    name: "Logistic Regression",
    category: "Core Data Science",
    importance: "Critical",
    quizArea: "Machine Learning",
    quickRevision:
      "Logistic regression models the probability of a binary outcome using a linear combination of features passed through the sigmoid function. It's a discriminative, linear classifier trained by maximizing log-likelihood (equivalently minimizing log loss).",
    coreConcepts: [
      "Sigmoid maps any real-valued score to (0, 1), interpretable as a probability.",
      "The decision boundary is linear in feature space (or in transformed feature space with engineered features).",
      "Coefficients represent log-odds change per unit increase in a feature, holding others constant.",
      "Trained via maximum likelihood estimation, solved with gradient-based optimizers (e.g. L-BFGS, SGD).",
    ],
    mathIntuition:
      "Given weights w and bias b, the model computes z = w·x + b, then p = 1 / (1 + e^-z). Loss is binary cross-entropy: -[y·log(p) + (1-y)·log(1-p)], averaged over the training set. This loss is convex, which is why logistic regression reliably converges to a global optimum.",
    example:
      "Predicting whether a patient will be readmitted within 30 days using vitals, lab results, and prior admission count. The model outputs a probability that a clinician can threshold based on operational capacity.",
    implementation: {
      language: "python",
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2)

scaler = StandardScaler().fit(X_train)
X_train_s, X_test_s = scaler.transform(X_train), scaler.transform(X_test)

clf = LogisticRegression(class_weight="balanced", max_iter=1000)
clf.fit(X_train_s, y_train)

probs = clf.predict_proba(X_test_s)[:, 1]`,
    },
    commonMistakes: [
      "Reporting accuracy on an imbalanced dataset without checking precision/recall or PR-AUC.",
      "Forgetting to scale features when regularization (L1/L2) is applied — the penalty is scale-sensitive.",
      "Treating the default 0.5 threshold as fixed instead of tuning it to the cost of false negatives vs false positives.",
      "Interpreting coefficients causally rather than as associations, especially with correlated features.",
    ],
    interviewQuestions: [
      "Why is logistic regression called a linear model despite the sigmoid nonlinearity?",
      "How do L1 and L2 regularization change the resulting coefficients differently?",
      "Why is log loss used instead of mean squared error for classification?",
      "How would you handle severe class imbalance in a logistic regression pipeline?",
    ],
    scenarioQuestion:
      "Your classifier has 95% accuracy but fails to detect a rare disease. What would you investigate, and how would you fix it?",
  },
  {
    slug: "deep-learning",
    name: "Deep Learning",
    category: "Core Data Science",
    importance: "High",
    quizArea: "Deep Learning",
    quickRevision:
      "Deep learning interview questions for DS/ML roles usually stay at the level of: why does this architecture/technique exist, what problem does it solve, and what breaks without it — not derivation-heavy math.",
    coreConcepts: [
      "Backpropagation is the chain rule applied layer by layer to compute gradients efficiently.",
      "Vanishing/exploding gradients motivate ReLU, residual connections, and normalization layers.",
      "Dropout and weight decay are the two most common regularizers for neural nets.",
      "Batch normalization stabilizes training by normalizing layer inputs, allowing higher learning rates.",
      "Transformers replaced RNNs for most sequence tasks because self-attention parallelizes across the sequence and captures long-range dependencies more directly.",
    ],
    mathIntuition:
      "For a deep network, the gradient of the loss w.r.t. an early layer's weights is a product of many partial derivatives (one per layer, via the chain rule). If each is < 1 (as with sigmoid/tanh), the product shrinks exponentially with depth — the vanishing gradient problem.",
    example:
      "A medical image classifier plateaus at 60% validation accuracy after 5 epochs while training accuracy climbs to 95% — signals overfitting, prompting data augmentation, dropout, or transfer learning from a pretrained backbone instead of training from scratch.",
    implementation: {
      language: "python",
      code: `import torch.nn as nn

class SimpleClassifier(nn.Module):
    def __init__(self, in_dim, hidden=128, n_classes=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.BatchNorm1d(hidden),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden, n_classes),
        )

    def forward(self, x):
        return self.net(x)`,
    },
    commonMistakes: [
      "Training from scratch on a small dataset instead of fine-tuning a pretrained model.",
      "Not shuffling training data, causing the model to learn spurious order-dependent patterns.",
      "Using accuracy as the only metric on an imbalanced classification task.",
      "Forgetting model.eval() (disabling dropout/batchnorm updates) at inference time in PyTorch.",
    ],
    interviewQuestions: [
      "Why do residual connections help train very deep networks?",
      "What problem does batch normalization solve, and what's a common pitfall using it with small batch sizes?",
      "Why did transformers largely replace RNNs/LSTMs for sequence modeling?",
      "How would you decide between training from scratch and fine-tuning a pretrained model?",
    ],
    scenarioQuestion:
      "Your model trains to near-zero loss but performs poorly on a held-out test set from a slightly different hospital's imaging equipment. What's this called, and how would you diagnose and address it?",
  },
  {
    slug: "mlops",
    name: "MLOps",
    category: "Core Data Science",
    importance: "Medium",
    quizArea: null,
    quickRevision:
      "MLOps interview questions for entry-level DS roles focus on whether you understand the lifecycle beyond training: versioning, monitoring, and knowing when a model needs retraining — not building full CI/CD pipelines from memory.",
    coreConcepts: [
      "Model drift: input distributions or the input-output relationship change over time, degrading performance silently.",
      "Feature stores centralize feature computation so training and serving use identical logic (avoiding train-serve skew).",
      "A/B testing or shadow deployment de-risks rolling out a new model version.",
      "Versioning data, code, and model artifacts together is what makes an experiment reproducible.",
    ],
    mathIntuition:
      "Drift detection often compares distributions statistically — e.g. population stability index (PSI) or KL divergence between the training feature distribution and the live serving distribution, flagging when they diverge past a threshold.",
    example:
      "A churn model trained pre-pandemic silently degrades as user behavior shifts — without monitoring prediction distributions or ground-truth lag metrics, the team wouldn't notice until business impact was already significant.",
    implementation: {
      language: "python",
      code: `# Minimal drift check: compare feature distributions between
# training data and a recent production sample
from scipy.stats import ks_2samp

stat, p_value = ks_2samp(train_df["feature_x"], live_df["feature_x"])
if p_value < 0.01:
    print("Significant distribution shift detected — flag for review")`,
    },
    commonMistakes: [
      "Treating model deployment as the finish line instead of the start of a monitoring lifecycle.",
      "Not logging prediction inputs/outputs, making it impossible to debug production issues later.",
      "Retraining on a schedule blindly, without evidence of actual drift.",
      "Skipping shadow/canary testing before a full rollout of a new model version.",
    ],
    interviewQuestions: [
      "What's the difference between data drift and concept drift?",
      "How would you detect that a deployed model needs retraining?",
      "What is train-serve skew and how do feature stores help prevent it?",
      "Walk through what you'd monitor for a model in production, beyond accuracy.",
    ],
    scenarioQuestion:
      "A model's offline evaluation metrics look great, but online business metrics didn't move after deployment. List three possible explanations you'd investigate first.",
  },
  {
    slug: "clinical-nlp",
    name: "Clinical NLP",
    category: "Specialization — Healthcare AI",
    importance: "High",
    quizArea: null,
    quickRevision:
      "Clinical NLP extracts structured information (diagnoses, medications, dosages) from unstructured clinical text — discharge summaries, physician notes — and must handle abbreviations, negation, and strict privacy constraints that general-domain NLP doesn't.",
    coreConcepts: [
      "Negation detection matters enormously: 'no evidence of pneumonia' must not be extracted as a positive pneumonia mention.",
      "Clinical text is dense with abbreviations and non-standard shorthand, often requiring domain-specific tokenization or normalization.",
      "Named entity recognition (NER) for conditions, medications, and dosages is the core extraction task, often fine-tuned from a biomedical/clinical pretrained model (e.g. ClinicalBERT).",
      "PHI (protected health information) must be identified and handled separately from clinical content — de-identification is often a required preprocessing step.",
    ],
    mathIntuition:
      "Fine-tuning a pretrained clinical language model for NER is typically framed as token classification: each token gets a BIO tag (Begin/Inside/Outside an entity span), and the model is trained to minimize cross-entropy loss over these per-token labels.",
    example:
      "Extracting medication + dosage pairs from a discharge summary to auto-populate a structured medication list, reducing manual chart review time for care coordination.",
    implementation: {
      language: "python",
      code: `# Example: using a pretrained biomedical NER pipeline
from transformers import pipeline

ner = pipeline("token-classification", model="d4data/biomedical-ner-all", aggregation_strategy="simple")
result = ner("Patient denies chest pain, started on metformin 500mg BID.")
# result includes entities for "metformin" (medication) and "500mg" (dosage),
# and ideally should NOT flag "chest pain" as a positive finding given "denies"`,
    },
    commonMistakes: [
      "Ignoring negation and extracting 'ruled out' conditions as if they were confirmed diagnoses.",
      "Applying a general-domain NLP model directly without domain adaptation — clinical vocabulary and abbreviations differ sharply.",
      "Not de-identifying PHI before further processing or sharing data, creating compliance risk.",
      "Evaluating only on entity extraction accuracy without checking downstream clinical usefulness.",
    ],
    interviewQuestions: [
      "Why is negation detection especially important in clinical NLP compared to general text?",
      "What's the difference between using a general-purpose LLM vs a domain-adapted model like ClinicalBERT here?",
      "How would you evaluate a clinical entity extraction system beyond precision/recall?",
      "What privacy considerations apply specifically to clinical text data?",
    ],
    scenarioQuestion:
      "Your extraction pipeline correctly identifies medications 92% of the time, but a clinical reviewer flags that it's missing rare drug names. How would you investigate and prioritize a fix given limited annotation budget?",
  },
  {
    slug: "medical-imaging",
    name: "Medical Imaging",
    category: "Specialization — Healthcare AI",
    importance: "High",
    quizArea: null,
    quickRevision:
      "Medical imaging AI applies computer vision (usually CNNs or vision transformers) to modalities like X-ray, CT, and MRI, typically for classification (disease present/absent), segmentation (organ/tumor boundaries), or detection (localizing findings).",
    coreConcepts: [
      "DICOM is the standard file format/protocol for medical images, carrying both pixel data and patient/study metadata.",
      "Class imbalance is severe and typical — most scans are normal, so naive accuracy is misleading (same trap as fraud detection).",
      "Transfer learning from ImageNet-pretrained backbones is standard, since labeled medical images are expensive and scarce.",
      "Segmentation tasks (e.g. tumor boundaries) use different architectures (U-Net) and metrics (Dice coefficient, IoU) than classification.",
    ],
    mathIntuition:
      "Dice coefficient for segmentation: 2·|A∩B| / (|A| + |B|), where A is predicted region and B is ground truth — it rewards overlap and is more informative than pixel accuracy when the target region is a small fraction of the image.",
    example:
      "A chest X-ray classifier flags pneumonia with a probability score; because false negatives (missed disease) are far costlier than false positives, the decision threshold is deliberately tuned toward higher recall, accepting more false alarms for radiologist review.",
    implementation: {
      language: "python",
      code: `import torchvision.models as models
import torch.nn as nn

# Transfer learning: replace the classifier head of a pretrained backbone
backbone = models.resnet50(weights="IMAGENET1K_V2")
backbone.fc = nn.Linear(backbone.fc.in_features, 2)  # binary: normal / abnormal

# Freeze early layers, fine-tune only the head and last block initially
for name, param in backbone.named_parameters():
    if not name.startswith(("layer4", "fc")):
        param.requires_grad = False`,
    },
    commonMistakes: [
      "Reporting accuracy on a heavily imbalanced dataset (rare disease) without recall/PR-AUC.",
      "Data leakage from the same patient appearing in both train and test splits (patient-level, not image-level, splitting is required).",
      "Not accounting for scanner/hospital-site variation causing poor generalization (a form of dataset shift).",
      "Using pixel accuracy instead of Dice/IoU for segmentation, which overstates performance on small target regions.",
    ],
    interviewQuestions: [
      "Why must train/test splits for medical imaging be done at the patient level, not the image level?",
      "How would you handle severe class imbalance in a disease classification task?",
      "What's the difference between classification, detection, and segmentation in this context, and when is each appropriate?",
      "Why might a model trained on one hospital's scanner generalize poorly to another hospital's images?",
    ],
    scenarioQuestion:
      "Your tumor segmentation model achieves 96% pixel accuracy but clinicians say it's missing small tumors entirely. What metric mismatch explains this, and what would you change?",
  },
  {
    slug: "phi-pii",
    name: "PHI / PII & Compliance",
    category: "Specialization — Healthcare AI",
    importance: "Medium",
    quizArea: null,
    quickRevision:
      "Healthcare AI systems must identify and protect PHI (protected health information, under HIPAA in the US) and PII more broadly. This shows up in interviews as questions about de-identification, data handling, and what changes when a project touches patient data.",
    coreConcepts: [
      "HIPAA's Safe Harbor method lists 18 identifiers (names, dates, MRNs, etc.) that must be removed or generalized for data to be considered de-identified.",
      "De-identification is not the same as anonymization guarantees — re-identification risk exists especially with rich datasets (e.g. rare disease + zip code + age).",
      "Access to PHI should follow least-privilege and be logged/auditable, not just 'encrypted at rest.'",
      "Synthetic data and federated learning are increasingly used to train models without centralizing raw patient data.",
    ],
    mathIntuition:
      "k-anonymity is a common way to reason about re-identification risk: a dataset is k-anonymous if every combination of quasi-identifiers (age, zip, gender) matches at least k individuals — smaller k means higher re-identification risk for any single record.",
    example:
      "Before training a readmission-risk model, dates of service are shifted by a random patient-specific offset and free-text notes are scrubbed of names/addresses, so the dataset satisfies Safe Harbor de-identification before ever reaching the ML team.",
    implementation: {
      language: "python",
      code: `import re

# Simplified example: redacting obvious identifiers from free text
# (a real pipeline would use a trained NER model, not just regex)
def redact_basic_phi(text: str) -> str:
    text = re.sub(r"\\b\\d{3}-\\d{2}-\\d{4}\\b", "[SSN]", text)          # SSN pattern
    text = re.sub(r"\\b\\d{1,2}/\\d{1,2}/\\d{2,4}\\b", "[DATE]", text)   # date pattern
    return text`,
    },
    commonMistakes: [
      "Assuming encryption alone satisfies compliance requirements — access control and auditing matter just as much.",
      "Treating 'de-identified' as a permanent guarantee rather than something that can be undone by combining datasets.",
      "Not restricting who on a data science team needs raw PHI access vs de-identified data for modeling.",
      "Overlooking that free-text clinical notes often contain identifiers that structured-field de-identification misses.",
    ],
    interviewQuestions: [
      "What is the difference between PHI and PII, and why does the distinction matter for a healthcare AI project?",
      "What are the two main methods HIPAA allows for de-identifying data?",
      "Why is de-identification not a permanent guarantee against re-identification?",
      "How would you design a data access policy for a team building a clinical risk model?",
    ],
    scenarioQuestion:
      "Your team wants to combine a de-identified clinical dataset with a public dataset (e.g. voter records) to enrich features. What re-identification risk does this introduce, and how would you evaluate whether it's acceptable?",
  },
];

export function findTopic(slug: string) {
  return topics.find((t) => t.slug === slug) ?? null;
}
