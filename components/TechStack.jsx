import { Fragment } from "react";

const icons = {
  "C": "c",
  "C++": "cplusplus",
  "Chart.js": "chartdotjs",
  "Docker": "docker",
  "FastAPI": "fastapi",
  "Git": "git",
  "GitHub": "github",
  "GitHub Actions": "githubactions",
  "Hugging Face": "huggingface",
  "LangChain": "langchain",
  "LangGraph": "langgraph",
  "Podman": "podman",
  "PostgreSQL": "postgresql",
  "Pydantic": "pydantic",
  "PyTorch": "pytorch",
  "Python": "python",
  "ReactJS": "react",
  "SQLite": "sqlite",
  "Streamlit": "streamlit",
  "TensorFlow": "tensorflow",
  "Typer": "typer",
  "pytest": "pytest",
  "scikit-learn": "scikitlearn",
};

export default function TechStack({ text }) {
  return text.split(/(,\s*|\/)/).map((name, index) => {
    const icon = icons[name];

    return (
      <Fragment key={index}>
        {icon ? (
          <span className="tech-name" tabIndex={0}>
            {name}
            <span className="tech-badge" aria-hidden="true">
              <span className="tech-icon" style={{ "--tech-icon": `url("/tech-icons/${icon}.svg")` }} />
            </span>
          </span>
        ) : name}
      </Fragment>
    );
  });
}
