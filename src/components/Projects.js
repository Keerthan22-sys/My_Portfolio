import { FaGithub } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';


const featured = [
    {
        badge: 'LLM Fine-Tuning',
        name: 'Fine-Tune with QLoRA — Indian Tax Domain Expert',
        tagline: 'End-to-end: dataset creation → QLoRA → DPO alignment → RAG → FastAPI',
        desc: 'Took Llama 3.1 8B and specialised it for Indian Income Tax law using QLoRA (4-bit quantization + LoRA adapters). The pipeline covers supervised fine-tuning, DPO alignment to reduce hallucination, a RAG layer over tax documents, and a FastAPI endpoint for production serving. Model published on HuggingFace. Trains on a free Colab T4.',
        tech: ['Python', 'QLoRA', 'Unsloth', 'DPO', 'RAG', 'HuggingFace', 'FastAPI', 'Llama 3.1'],
        github: 'https://github.com/Keerthan22-sys/Fine-Tune-with-QLoRA',
        huggingface: 'https://huggingface.co/keerthan222/indian-tax-expert-llama-3.1-8b-lora',
        accent: true,
    },
    {
        badge: 'AI Agents',
        name: 'Deep Research Assistant',
        tagline: 'Autonomous multi-agent research at web scale',
        desc: 'A fully autonomous research assistant that plans, searches, and synthesizes information across the web. Built with CrewAI\'s multi-agent framework — one agent decomposes the query, others run parallel searches via Firecrawl, a final agent synthesises a structured report.',
        tech: ['Python', 'CrewAI', 'LangChain', 'OpenAI', 'Firecrawl', 'Streamlit'],
        github: 'https://github.com/Keerthan22-sys/deep_research_app',
        accent: false,
    },
    {
        badge: 'Agent Infrastructure',
        name: 'Multi-Agent System — A2A + MCP',
        tagline: 'Agent coordination using next-gen open protocols',
        desc: 'Implemented Google\'s Agent-to-Agent (A2A) protocol alongside Anthropic\'s Model Context Protocol (MCP) to enable structured, interoperable communication between autonomous agents. Explores how standardised messaging reduces brittleness in complex AI pipelines.',
        tech: ['Python', 'A2A Protocol', 'MCP', 'LLM Orchestration'],
        github: 'https://github.com/Keerthan22-sys/multi-agent-system-a2a-mcp',
        accent: false,
    },
    {
        badge: 'AI Product',
        name: 'DevOnboard AI',
        tagline: 'AI-powered developer onboarding platform',
        desc: 'A TypeScript platform that uses AI to accelerate developer onboarding — parsing codebases, generating context-aware documentation, and answering questions about unfamiliar repos. Targets the painful first-week experience every engineer faces at a new company.',
        tech: ['TypeScript', 'Next.js', 'OpenAI', 'RAG', 'Vector DB'],
        github: 'https://github.com/Keerthan22-sys/DevOnboard_AI',
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
                    Focused on AI-native products — fine-tuned models, agents that reason,
                    systems that coordinate, and infrastructure that holds it all together.
                </p>

                {/* Featured */}
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

                {/* Other notable projects */}
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
