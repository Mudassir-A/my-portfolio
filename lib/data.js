// All content comes from the resume. Edit this file to update the site.
export const NAME = "Mohd Mudassir Ansari";
export const ROLE = "AI/ML Engineer";
export const LOCATION = "Mumbai, Maharashtra";
export const INTRO =
  "Building production-ready RAG pipelines, LLM agents, and ETL automation.";

export const EMAIL = "mudassirimranansari@gmail.com";
export const PHONE = "+91 93222 40824";
export const PHONE_HREF = "+919322240824";
export const LINKEDIN = { label: "linkedin.com/in/mudassiria", url: "https://linkedin.com/in/mudassiria" };
export const GITHUB = { label: "github.com/Mudassir-A", url: "https://github.com/Mudassir-A" };

export const NAV = [
  ["summary", "Profile"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["projects", "Projects"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

export const SUMMARY =
  "I’m an AI/ML engineer with a background in computer engineering. I enjoy working across machine learning, software engineering, and data engineering, with an emphasis on reliability and maintainability.";

export const SKILLS = [
  ["AI/ML", "PyTorch, TensorFlow, scikit-learn, XGBoost, LangChain, LangGraph, RAG, Hugging Face"],
  ["Data & Backend", "Python, SQL, C/C++, Informatica, FastAPI, asyncio, PostgreSQL, Oracle, ChromaDB"],
  ["Tools", "Docker/Podman, Git/GitHub, GitHub Actions, pytest, Streamlit, Power BI, Excel"],
];

export const EXPERIENCE = [
  {
    role: "Associate Consultant",
    org: "Fintellix India Pvt. Ltd.",
    place: "Mumbai",
    period: "Jun 2026 – Present",
    points: [
      "Architected a Python-based RAG agent generating test cases and sample data from client BRDs/FSDs; validated on 5 documents, cutting test preparation effort by 40%.",
      "Automated Informatica mapping creation from a single Excel sheet via a scheduled ETL pipeline, cutting build effort by 75% and keeping regulatory reports current.",
    ],
  },
  {
    role: "Student Intern",
    org: "SAFETEC: Auto Security Solutions",
    place: "Mumbai",
    period: "Jun 2022 – Aug 2022",
    points: [
      "Maintained data systems for 10+ school bus routes, vehicles, and student records, ensuring accurate daily transport operations.",
      "Optimized bus routes and records, improving data accuracy and routing efficiency by 12%.",
    ],
  },
];

export const EDUCATION = [
  { degree: "B.E. Computer Engineering", school: "University of Mumbai", score: "CGPA 8.59", year: "2023–2026" },
  { degree: "Diploma, Computer Engineering", school: "MSBTE, Mumbai", score: "88.51%", year: "2020–2023" },
  { degree: "SSC (Class X)", school: "Maharashtra State Board", score: "92.60%", year: "2020" },
];

// Add each project's repository URL in `url` to show a link on the site.
export const PROJECTS = [
  {
    title: "Concurrent Web Fetcher",
    stack: "Python, asyncio, httpx, Pydantic, Typer",
    date: "Oct 2026",
    url: "concurrent-web-fetcher.vercel.app",
    points: [
      "Built an async fetcher with a 4-process HTML-cleaning pool, cutting 266-page crawl time by 74%.",
      "Engineered retries with exponential backoff, jitter, and Retry-After, plus per-host rate limiting and robots.txt compliance.",
      "Shipped a typed Typer CLI emitting Pydantic-validated JSONL for RAG, with pytest, ruff, mypy, and GitHub Actions CI.",
    ],
  },
  {
    title: "OptiRAG",
    stack: "Python, FastAPI, ChromaDB, LiteLLM, SQLite, Streamlit",
    date: "Oct 2026",
    url: "optirag.vercel.app",
    points: [
      "Built a cost-aware RAG system with confidence-based model escalation, TTL caching, and corpus-version-aware invalidation.",
      "Cut LLM costs by 57.3% and p95 latency by 97.5% through semantic caching and cost-aware routing.",
      "Developed a Streamlit dashboard tracking LLM cost, retrieval quality, and latency.",
    ],
  },
  {
    title: "SyncForge",
    stack: "Python, Pydantic, Podman, SQL Server, Oracle SQL",
    date: "Sep 2026",
    url: "https://github.com/Mudassir-A/syncforge",
    points: [
      "Engineered a reusable Python ETL tool for source-to-target integration, driven by Excel-based mappings and filters.",
      "Automated integrity checks reconciling source and target row counts to flag transfer discrepancies.",
      "Added email alerts for pipeline success and failure, strengthening monitoring.",
    ],
  },
  {
    title: "LexPopuli",
    stack: "ReactJS, Chart.js, Hugging Face",
    date: "Mar 2026",
    url: "https://github.com/Mudassir-A/LexPopuli",
    points: [
      "Built an AI legal platform with 85% summarization accuracy and support for 3+ regional languages.",
      "Developed a RAG chatbot serving 100+ queries/day at 90% contextual response accuracy.",
      "Implemented BART-based text simplification, reducing complexity by 40% and enabling multilingual translation.",
    ],
  },
];

export const CERTIFICATIONS = [
  ["Google Data Analytics Specialization", "Coursera", "https://coursera.org/verify/professional-cert/6PL6C987EVXJ"],
  ["Google Cloud Engineering Certificate", "Google Cloud", "https://www.credly.com/badges/95e742b3-e7fc-477c-8b52-08a68427c0d4/public_url"],
  ["Deloitte Data Analytics Job Simulation", "The Forage", "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_zY2vrpe8ER4snSRER_1751437938772_completion_certificate.pdf"],
  ["Career Essentials in Data Analysis (Microsoft & LinkedIn)", "LinkedIn", "https://www.linkedin.com/learning/certificates/47227747af774dcb38173199ff8d9b42a7ba6ddd26d38aa839d6873a4e8a4c0e"],
  ["Power BI for Data Visualization", "Udemy", "http://ude.my/UC-f8cb4a13-32a6-4924-9f81-bc67c00f3181/"],
];
