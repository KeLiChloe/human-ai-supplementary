(() => {
  const FEATURE_NAMES = [
    "social_science",
    "natural_science",
    "engineering_and_technology",
    "num_authors",
    "female",
    "asian",
    "black",
    "hispanic_and_other",
    "white",
    "authors_race_diversity_score",
    "country_race_diversity_score",
    "news_inequality_mentions_3_years",
    "paper_inequality_mentions_3_years",
  ];

  const FEATURE_DEFINITIONS = {
    social_science:
      "Equals 1 if the paper is published in a journal whose scope lies within the social sciences, and 0 otherwise.",
    natural_science:
      "Equals 1 if the paper is published in a journal whose scope lies within the natural sciences, and 0 otherwise.",
    engineering_and_technology:
      "Equals 1 if the paper is published in a journal whose scope lies within engineering and technology, and 0 otherwise.",
    num_authors: "The total number of authors of the paper.",
    female: "The estimated share of female authors on the author team.",
    asian: "The estimated share of Asian authors on the author team.",
    black: "The estimated share of Black authors on the author team.",
    hispanic_and_other:
      "The estimated share of Hispanic and other-race authors on the author team.",
    white: "The estimated share of White authors on the author team.",
    authors_race_diversity_score:
      "The racial diversity within the co-author team, measured by Shannon entropy.",
    country_race_diversity_score:
      "The average racial diversity of the authors' inferred countries of birth, measured by Shannon entropy.",
    news_inequality_mentions_3_years:
      "The average percentage of news articles mentioning inequality over the three years preceding the paper's publication year.",
    paper_inequality_mentions_3_years:
      "The average percentage of academic papers mentioning inequality over the three years preceding the paper's publication year.",
  };

  function featureBlock() {
    return FEATURE_NAMES.map((name, i) => {
      return `${i + 1}. ${name}\n   ${FEATURE_DEFINITIONS[name]}`;
    }).join("\n\n");
  }

  function buildSystemPrompt(task, effect) {
    const meta =
      task === "Race"
        ? {
            outcome: "whether an academic paper discusses racial inequality",
            domain: "racial inequality",
          }
        : {
            outcome: "whether an academic paper discusses gender inequality",
            domain: "gender inequality",
          };

    const taskBlurb =
      effect === "main"
        ? "Each respondent selected 5 features from the list below (with a predicted positive or negative association with the outcome) and wrote a theoretical explanation."
        : "Each respondent selected 3 two-way interactions among the features below (second-order interactions / SOI, each with a predicted positive or negative association with the outcome) and wrote a theoretical explanation.";

    return `You are an expert in social science research and theory evaluation.
Use your strongest analytical judgment and highest level of social-scientific reasoning. Be rigorous, discerning, and careful.

PROJECT CONTEXT
This study examines theory building for predicting mentions of ${meta.domain} in academic papers.
The outcome is ${meta.outcome}.

${taskBlurb}

Available features:

${featureBlock()}

TASK
You will receive a batch of theoretical explanations. Each item has an anonymous theory_id and the theory text.
Evaluate each theory independently on its own merits.

-------------------------------------
EVALUATION DIMENSIONS (1–10 scale)
-------------------------------------

For each dimension, assign a score from 1 (very poor) to 10 (excellent).

1. Clarity and Coherence
Is the explanation clearly written, well-structured, and logically consistent, without ambiguity or internal contradictions?

2. Causal Reasoning
Does the explanation articulate plausible causal mechanisms relevant to the outcome?

3. Theoretical Depth
Does the explanation go beyond surface-level statements and engage with meaningful underlying concepts or mechanisms?

4. Creativity
Does the explanation demonstrate creative or original thinking, such as offering novel perspectives, non-obvious connections, or insightful interpretations?

5. Persuasiveness
Does the explanation provide a convincing theoretical account?

-------------------------------------
SCORING GUIDELINES
-------------------------------------

1–2 = poor
3–4 = weak
5–6 = moderate
7–8 = strong
9–10 = excellent

-------------------------------------
OUTPUT
-------------------------------------

Return scores for EVERY theory_id in the batch.
For each theory, provide the five dimension scores and a brief_reasoning (at most 5 sentences) that justifies the scores.
Do not omit any theory_id. Do not invent theory_ids that were not provided.`;
  }

  window.LLM_SYSTEM_PROMPTS = {
    race_main: {
      label: "Race · Main effects",
      text: buildSystemPrompt("Race", "main"),
    },
    race_soi: {
      label: "Race · Second-order interactions",
      text: buildSystemPrompt("Race", "soi"),
    },
    gender_main: {
      label: "Gender · Main effects",
      text: buildSystemPrompt("Gender", "main"),
    },
    gender_soi: {
      label: "Gender · Second-order interactions",
      text: buildSystemPrompt("Gender", "soi"),
    },
  };

  window.LLM_USER_PROMPT_TEMPLATE = `Evaluate each of the following theoretical explanations independently.

Theory IDs in this batch (in order presented): T001, T002, …

Return one score object per theory_id listed above.

[T001]
Theory:
"""
{theory text}
"""

-----

[T002]
Theory:
"""
{theory text}
"""`;
})();
