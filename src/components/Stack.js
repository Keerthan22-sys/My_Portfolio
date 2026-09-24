const categories = [
    {
        label: 'AI/ML & LLM Engineering',
        items: [
            'RAG Pipelines',
            'Multi-Agent Systems (MCP, A2A)',
            'LLM Fine-Tuning (QLoRA, LoRA, DPO, SFT)',
            'Prompt Engineering',
            'LLM-as-Judge',
            'NLP & Deep Learning',
            'PyTorch / TensorFlow',
            'Scikit-learn / XGBoost',
        ],
    },
    {
        label: 'Frameworks',
        items: [
            'FastAPI',
            'Next.js / React',
            'Node.js',
            'Spring Boot',
            'Django',
            'LangChain / LlamaIndex',
            'HuggingFace (TRL, PEFT)',
            'Unsloth / CrewAI',
        ],
    },
    {
        label: 'Backend & Data',
        items: [
            'PostgreSQL / MySQL',
            'Redis / MongoDB',
            'DynamoDB / ChromaDB / Pinecone',
            'Kafka / Spark',
            'REST APIs / GraphQL',
            'Microservices',
            'Event-Driven Architecture',
            'System Design',
        ],
    },
    {
        label: 'Infrastructure',
        items: [
            'AWS (EC2, S3, CDK, Lambda, ECR, ECS, BDA, Textract)',
            'Docker / Kubernetes',
            'GitHub Actions / GitLab CI/CD',
            'Arize Phoenix / OpenTelemetry',
            'Prometheus / Grafana',
            'Nginx / Linux',
        ],
    },
    {
        label: 'Languages',
        items: [
            'Java',
            'Python',
            'JavaScript / TypeScript',
            'Golang',
            'GraphQL / SQL',
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
                    From fine-tuning LLMs to deploying microservices on Kubernetes —
                    comfortable going deep into any layer of the stack.
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
