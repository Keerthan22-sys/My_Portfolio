import { FaGithub } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const featured = [
    {
        badge: 'Enterprise RAG',
        name: 'DevOnboard AI — Privacy-First RAG Platform',
        tagline: 'End-to-end: FastAPI async backend + RAG pipeline + PostgreSQL + JWT auth',
        desc: 'Engineered the FastAPI async backend with SQLAlchemy 2.0, Pydantic v2, JWT auth, and a normalized PostgreSQL schema exposing full REST APIs for auth, document management, chat, and audit logging. Designed the RAG pipeline: format-aware ingestion, recursive token-based chunking (1000 tokens, 200 overlap), sentence-transformer embeddings (MiniLM-L6-v2), ChromaDB vector store, top-k retrieval with cross-encoder reranking, and Ollama LLM generation with strict source-citation prompting.',
        tech: ['FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL', 'ChromaDB', 'Pydantic v2', 'JWT', 'Ollama', 'sentence-transformers'],
        github: 'https://github.com/Keerthan22-sys/DevOnboard_AI',
        accent: true,
    },
    {
        badge: 'Multi-Agent Systems',
        name: 'SYNAPSE — Multi-Agent Intelligence System',
        tagline: '13-microservice pipeline: router → researcher → writer → critic',
        desc: 'Engineered a 13-microservice multi-agent pipeline using FastMCP tool servers, Redis pub/sub for inter-agent messaging, ChromaDB for persistent memory, and an evaluator-critic orchestration loop. Deployed on Docker + Kubernetes with Arize Phoenix / OpenTelemetry tracing and fault-tolerant design — graceful degradation on agent or Redis failure, LLM-as-judge evaluation across a 20-topic benchmark.',
        tech: ['FastMCP', 'Redis', 'ChromaDB', 'Docker', 'Kubernetes', 'OpenTelemetry', 'Arize Phoenix', 'LLM-as-Judge'],
        github: 'https://github.com/Keerthan22-sys/multi-agent-system-a2a-mcp',
        accent: false,
    },
    {
        badge: 'LLM Fine-Tuning',
        name: 'Fine-Tune with QLoRA — Domain Expert',
        tagline: 'Dataset creation → QLoRA → DPO alignment → RAG → FastAPI',
        desc: 'Took Llama 3.1 8B and specialized it for Indian Income Tax law using QLoRA (4-bit quantization + LoRA adapters). The pipeline covers supervised fine-tuning, DPO alignment to reduce hallucination, a RAG layer over tax documents, and a FastAPI endpoint for production serving. Model published on HuggingFace. Trains on a free Colab T4.',
        tech: ['Python', 'QLoRA', 'Unsloth', 'DPO', 'RAG', 'HuggingFace', 'FastAPI', 'Llama 3.1'],
        github: 'https://github.com/Keerthan22-sys/Fine-Tune-with-QLoRA',
        huggingface: 'https://huggingface.co/keerthan222/indian-tax-expert-llama-3.1-8b-lora',
        accent: false,
    },
    {
        badge: 'AI Agents',
        name: 'Deep Research Assistant',
        tagline: 'Autonomous multi-agent research at web scale',
        desc: "A fully autonomous research assistant that plans, searches, and synthesizes information across the web. Built with CrewAI's multi-agent framework — one agent decomposes the query, others run parallel searches via Firecrawl, a final agent synthesizes a structured report.",
        tech: ['Python', 'CrewAI', 'LangChain', 'OpenAI', 'Firecrawl', 'Streamlit'],
        github: 'https://github.com/Keerthan22-sys/deep_research_app',
        accent: false,
    },
];

const others = [
    {
        name: 'Digital Payment Solution',
        desc: 'National SIH 2022 winner. Web + mobile app fighting overcharging at Aadhaar Seva Kendra. Django + React + Cashfree API.',
        link: 'https://devpost.com/software/digital-payment-solution',
    },
    {
        name: 'Local ChatGPT',
        desc: 'Run local LLMs with a clean Streamlit chat UI. Privacy-first, zero API cost.',
        link: 'https://github.com/Keerthan22-sys/Local-ChatGPT-using-Streamlit',
    },
    {
        name: 'Instigar',
        desc: 'Full-stack TypeScript + Java Spring Boot application built to solve a real coordination problem.',
        link: 'https://github.com/Keerthan22-sys/Instigar',
    },
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Selected Work</div>
                <h2 className="section-title">What I've built</h2>
                <p className="section-lead">
                    Enterprise RAG platforms, multi-agent orchestration, fine-tuned LLMs,
                    and the infrastructure to run them in production.
                </p>

                <div className="projects-featured">
                    {featured.map((p) => (
                        <div
                            key={p.name}
                            className={`project-featured-card${p.accent ? ' accent-border' : ''}`}
                        >
                            <div>
                                <div className="pf-top">
                                    <span className="pf-badge">{p.badge}</span>
                                </div>
                                <div className="pf-name">{p.name}</div>
                                <div className="pf-tagline">{p.tagline}</div>
                                <p className="pf-desc">{p.desc}</p>
                                <div className="pf-tech">
                                    {p.tech.map((t) => (
                                        <span key={t} className="tech-chip">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="pf-links">
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="pf-link"
                                >
                                    <FaGithub /> Code <HiArrowRight />
                                </a>
                                {p.huggingface && (
                                    <a
                                        href={p.huggingface}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="pf-link"
                                    >
                                        <span role="img" aria-label="huggingface">🤗</span> Model <HiArrowRight />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-heading-row">
                    <h3>Other notable work</h3>
                    <div className="divider" />
                </div>
                <div className="projects-grid">
                    {others.map((p) => (
                        <div key={p.name} className="project-card">
                            <div className="project-card-name">{p.name}</div>
                            <p className="project-card-desc">{p.desc}</p>
                            <a
                                href={p.link}
                                target="_blank"
                                rel="noreferrer"
                                className="project-card-link"
                            >
                                View <HiArrowRight />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
