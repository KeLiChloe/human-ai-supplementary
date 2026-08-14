window.PAPER_FEATURES = [
  {
    id: "social_science",
    name: "social_science",
    type: "Binary",
    typeDetail: "Binary",
    description:
      "Equals 1 if the paper is published in a journal whose scope lies within social sciences (e.g., sociology, political science, psychology, economics, history, philosophy), and 0 otherwise.",
  },
  {
    id: "natural_science",
    name: "natural_science",
    type: "Binary",
    typeDetail: "Binary",
    description:
      "Equals 1 if the paper is published in a journal whose scope lies within natural sciences (e.g., biology, chemistry, physics, environmental science, medicine), and 0 otherwise.",
  },
  {
    id: "engineering_and_technology",
    name: "engineering_and_technology",
    type: "Binary",
    typeDetail: "Binary",
    description:
      "Equals 1 if the paper is published in a journal whose scope lies within engineering and technology (e.g., engineering, computer science, applied mathematics), and 0 otherwise.",
  },
  {
    id: "num_authors",
    name: "num_authors",
    type: "Integer",
    typeDetail: "Integer",
    description: "Total number of authors of the paper.",
  },
  {
    id: "female",
    name: "female",
    type: "Continuous",
    typeDetail: "Continuous in range (0, 1)",
    description:
      "The estimated share of female authors on the author team. For each co-author, we infer the probability of being female based on their first name and then calculate the average probability across all co-authors.",
  },
  {
    id: "asian",
    name: "asian",
    type: "Continuous",
    typeDetail: "Continuous in range (0, 1)",
    description:
      "The estimated share of Asian authors on the author team. For each author, we infer their most likely country of birth based on their last name. Using the racial composition of that country, we estimate the probability that the author is Asian. The final score is the average of these estimated “Asian probability” values across all co-authors.",
  },
  {
    id: "black",
    name: "black",
    type: "Continuous",
    typeDetail: "Continuous in range (0, 1)",
    description:
      "The estimated share of Black authors on the author team. For each author, we infer their most likely country of birth based on their last name. Using the racial composition of that country, we estimate the probability that the author is Black. The final score is the average of these estimated “Black probability” values across all co-authors.",
  },
  {
    id: "hispanic_and_other",
    name: "hispanic_and_other",
    type: "Continuous",
    typeDetail: "Continuous in range (0, 1)",
    description:
      "The estimated share of Hispanic and other-race (i.e., other than Black, White, and Asian) authors on the author team. For each author, we infer their most likely country of birth based on their last name. Using the racial composition of that country, we estimate the probability that the author is Hispanic or another race. The final score is the average of these estimated probabilities across all co-authors.",
  },
  {
    id: "white",
    name: "white",
    type: "Continuous",
    typeDetail: "Continuous in range (0, 1)",
    description:
      "The estimated share of White authors on the author team. For each author, we infer their most likely country of birth based on their last name. Using the racial composition of that country, we estimate the probability that the author is White. The final score is the average of these estimated “White probability” values across all co-authors.",
  },
  {
    id: "authors_race_diversity_score",
    name: "authors_race_diversity_score",
    type: "Continuous",
    typeDetail: "Continuous",
    description:
      "The average racial diversity within the co-author team, measured by Shannon entropy. For each author, we first infer their most likely country of birth based on their last name. Based on the country’s known racial composition, we assign each author a 4-dimensional race-composition probability vector over the four racial categories (Asian, Black, Hispanic_and_other, White). To compute the diversity score, we first average these probability vectors across all authors to obtain a team-level racial distribution. We then apply Shannon entropy to this averaged distribution. Higher values indicate a more balanced mix of racial groups within the author team; lower values suggest dominance by a single racial group.",
  },
  {
    id: "country_race_diversity_score",
    name: "country_race_diversity_score",
    type: "Continuous",
    typeDetail: "Continuous",
    description:
      "The average racial diversity of the authors’ countries of birth, measured by Shannon entropy. For each author, we first infer their most likely country of birth based on their last name. Based on the country’s known racial composition, we assign each author a 4-dimensional race-composition probability vector over the four racial categories (Asian, Black, Hispanic_and_other, White). To compute the diversity score, we first calculate Shannon entropy for each author’s probability vector. We then average these entropy values across all authors. Higher values indicate that, on average, the authors come from countries with racially balanced populations; lower values mean that the authors tend to come from countries dominated by a single racial group.",
  },
  {
    id: "news_inequality_mentions_3_years",
    name: "news_inequality_mentions_3_years",
    type: "Continuous",
    typeDetail: "Continuous",
    description:
      "The average percentage of news articles mentioning inequality across all forms—including gender, racial, economic, and general inequality—over the three years preceding the paper’s publication year.",
  },
  {
    id: "paper_inequality_mentions_3_years",
    name: "paper_inequality_mentions_3_years",
    type: "Continuous",
    typeDetail: "Continuous",
    description:
      "The average percentage of academic papers mentioning inequality across all forms—including gender, racial, economic, and general inequality—over the three years preceding the paper’s publication year.",
  },
];
