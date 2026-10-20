// Edit this file to update the whole site.
export const NAME = "Mudassir Ansari";
export const EMAIL = "hello@example.com";

export const TAGLINE = "I train models and build agents.";

export const ABOUT = [
  "I'm an associate consultant working on regulatory technology with python and sql, turning compliance data into systems people can rely on.",
  "On the side I build machine learning and LLM systems: RAG pipelines, tool-using agents and end-to-end models. I like to understand the math before reaching for a library.",
];


export const HOW_I_WORK = [
  ["scope", "start from the problem and the data, not the model"],
  ["baseline", "build the simplest version that could work and measure it"],
  ["iterate", "change one thing at a time and keep what the numbers support"],
  ["deploy", "ship it, watch it in production, and fix what breaks"],
];


export const NAV = [
  ["about", "about"],
  ["skills", "skills"],
  ["projects", "projects"],
  ["education", "education"],
  ["experience", "experience"],
  ["contact", "contact"],
];

export const SKILLS = [
  "python", "sql", "scikit-learn", "pytorch", "machine learning",
  "deep learning", "llms", "rag", "agents",
];

export const SKILL_GROUPS = [
  { title: "languages & data", items: ["python", "sql"] },
  { title: "ml & deep learning", items: ["scikit-learn", "pytorch", "machine learning", "deep learning"] },
  { title: "llms & agents", items: ["llms", "rag", "agents"] },
];

export const FILTERS = [
  ["all", "all"],
  ["llm", "llm & rag"],
  ["ml", "ml & dl"],
];

export const PROJECTS = [
  {
    cat: "ml",
    kind: "python · pytorch",
    title: "neural nets from scratch",
    text: "mlp, cnn and transformer blocks written by hand to understand backprop and attention before using the libraries.",
    url: "https://github.com/",
  },
  {
    cat: "llm",
    kind: "llm · retrieval",
    title: "rag pipeline",
    text: "document chunking, embeddings, vector search and grounded answers over a custom knowledge base.",
    url: "https://github.com/",
  },
  {
    cat: "llm",
    kind: "llm · tools",
    title: "tool-using agent",
    text: "a small agent that plans, calls tools and checks its own output on multi-step tasks.",
    url: "https://github.com/",
  },
  {
    cat: "ml",
    kind: "python · scikit-learn",
    title: "end-to-end ml pipeline",
    text: "feature engineering, model selection and evaluation on tabular data, with sql for data prep.",
    url: "https://github.com/",
  },
];

export const EDUCATION = [
  {
    title: "b.e. in computer engineering",
    place: "university of mumbai",
    text: "core computer science with a growing focus on machine learning and ai.",
  },
  {
    title: "diploma in computer engineering",
    place: "msbte",
    text: "programming, databases and networking fundamentals.",
  },
];

export const EXPERIENCE = [
  {
    title: "associate consultant",
    place: "regtech company · present",
    text: "work on regulatory technology solutions with python and sql, turning compliance data into reliable, usable systems.",
  },
];

export const SOCIALS = [
  ["github", "https://github.com/"],
  ["linkedin", "https://www.linkedin.com/"],
  ["medium", "https://medium.com/"],
  ["x", "https://x.com/"],
];