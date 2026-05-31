const categories = [
    {
        label: 'AI / ML',
        items: [
            'Python',
            'PyTorch',
            'LangChain',
            'CrewAI',
            'HuggingFace Transformers',
            'OpenAI API',
            'Unsloth / QLoRA',
            'DPO Alignment',
            'Streamlit',
            'scikit-learn',
        ],
    },
    {
        label: 'Agents & Protocols',
        items: [
            'A2A Protocol',
            'Model Context Protocol (MCP)',
            'RAG pipelines',
            'Tool-calling / Function use',
            'LangGraph',
            'Firecrawl',
            'Multi-agent orchestration',
        ],
    },
    {
        label: 'Backend & APIs',
        items: [
            'FastAPI',
            'Node.js',
            'Java (Spring Boot)',
            'Go',
            'Django',
            'REST / GraphQL',
            'MySQL / PostgreSQL',
        ],
    },
    {
        label: 'Frontend',
        items: [
            'React',
            'TypeScript',
            'Next.js',
            'Angular',
            'HTML5 / CSS3',
        ],
    },
    {
        label: 'Infrastructure',
        items: [
            'AWS',
            'Docker',
            'Kubernetes',
            'Linux',
            'Git / GitHub',
            'Firebase',
            'Vercel',
        ],
    },
    {
        label: 'Languages',
        items: [
            'Python',
            'TypeScript / JavaScript',
            'Java',
            'Go',
            'SQL',
        ],
    },
];

const Stack = () => {
    return (
        <section id="stack" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Stack</div>
                <h2 className="section-title">Tools I reach for</h2>
                <p className="section-lead">
                    Opinionated about the right tool for the job. Comfortable going
                    deep into any layer of the stack when needed.
                </p>
                <div className="stack-grid">
                    {categories.map((cat) => (
                        <div key={cat.label}>
                            <div className="stack-category-label">{cat.label}</div>
                            <div className="stack-items">
                                {cat.items.map((item) => (
                                    <div key={item} className="stack-item">
                                        <span className="stack-item-dot" aria-hidden="true" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stack;
