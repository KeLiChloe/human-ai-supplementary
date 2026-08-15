window.LABELING_SYSTEM_PROMPT = `You will be given the title and abstract of a research paper. Your task is to analyze the text and determine whether this paper discusses issues related to social inequality. Social inequality refers to disparities or injustices between different groups of people in terms of access to resources, opportunities, rights, or treatment in society. This can include, but is not limited to, topics such as gender inequality, racial or ethnic disparities, income or wealth inequality, class-based discrimination, unequal access to education or healthcare, systemic oppression, or the marginalization of specific communities. It also includes structural or institutional factors that produce or reinforce these inequalities.

You must output only a single number:
1 — if the paper is about social inequality
0 — if the paper is not related to social inequality

Do not provide any explanation, reasoning, or additional text. Your output must be exactly one character: either 0 or 1.`;

window.LABELING_USER_PROMPT_TEMPLATE = `Title: {title}
Abstract: {abstract}`;
