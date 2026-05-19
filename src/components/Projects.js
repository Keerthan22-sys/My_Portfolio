import { FaGithub } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const featured = [
    {
        badge: 'AI Agents',
        name: 'Deep Research Assistant',
        tagline: 'Autonomous multi-agent research at web scale',
        desc: 'A fully autonomous research assistant that plans, searches, and synthesizes information across the web. Built with CrewAI\'s multi-agent framework — one agent decomposes the query, others run parallel searches via Firecrawl, a final agent synthesises a structured report. Wrapped in a clean Streamlit UI.',
        tech: ['Python', 'CrewAI', 'LangChain', 'OpenAI', 'Firecrawl', 'Streamlit'],
        github: 'https://github.com/Keerthan22-sys/deep_research_app',
        accent: true,
    },
    {
        badge: 'Agent Infrastructure',
        name: 'Multi-Agent System — A2A + MCP',
        tagline: 'Agent coordination using next-gen open protocols',
        desc: 'Implemented Google\'s Agent-to-Agent (A2A) protocol alongside Anthropic\'s Model Context Protocol (MCP) to enable structured, interoperable communication between autonomous agents. Explores how standardised messaging between agents reduces brittleness in complex AI pipelines.',
        tech: ['Python', 'A2A Protocol', 'MCP', 'LLM Orchestration'],
        github: 'https://github.com/Keerthan22-sys/multi-agent-system-a2a-mcp',
        accent: false,
    },
    {
        badge: 'AI Product',
        name: 'DevOnboard AI',
        tagline: 'AI-powered developer onboarding platform',
        desc: 'A TypeScript-based platform that uses AI to accelerate developer onboarding — parsing codebases, generating context-aware documentation, and answering questions about unfamiliar repos. Targets the painful first-week experience every engineer faces at a new company.',
        tech: ['TypeScript', 'Next.js', 'OpenAI', 'RAG', 'Vector DB'],
        github: 'https://github.com/Keerthan22-sys/DevOnboard_AI',
        accent: false,
    },
];

const others = [
    {
        name: 'Local ChatGPT (Streamlit)',
        desc: 'Run local LLMs with a clean chat UI. Privacy-first alternative to cloud APIs.',
        link: 'https://github.com/Keerthan22-sys/Local-ChatGPT-using-Streamlit',
    },
    {
        name: 'Digital Payment Solution',
        desc: 'National SIH winner. Web + mobile app fighting overcharging at Aadhaar Seva Kendra via Cashfree + Firebase.',
        link: 'https://devpost.com/software/digital-payment-solution',
    },
    {
        name: 'Instigar',
        desc: 'Full-stack TypeScript application — Java backend, modern frontend. Built to solve a real coordination problem.',
        link: 'https://github.com/Keerthan22-sys/Instigar',
    },
    {
        name: 'Campus Buzz',
        desc: 'Full-stack campus social platform — REST API + React frontend. Shipped and used by peers.',
        link: 'https://github.com/Keerthan22-sys/campus_buzz',
    },
    {
        name: 'Women Safety App',
        desc: 'Android app with GPS emergency alerts and SMS to contacts. Practical safety tool.',
        link: 'https://github.com/Keerthan22-sys/Women-Safety-Application',
    },
    {
        name: 'Golang + React CRUD',
        desc: 'Full-stack CRUD with Go API backend and React frontend. Learning systems thinking.',
        link: 'https://github.com/Keerthan22-sys/Golang-with-React',
    },
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Selected Work</div>
                <h2 className="section-title">What I've built</h2>
                <p className="section-lead">
                    Focused on AI-native products — agents that reason, systems that
                    coordinate, and interfaces that make AI feel effortless.
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
                            </div>
                        </div>
                    ))}
                </div>

                {/* Other projects */}
                <div className="projects-heading-row">
                    <h3>More builds</h3>
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
