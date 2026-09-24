const experiences = [
    {
        role: 'AI Consultant',
        company: 'MHP India — A Porsche Company',
        location: 'Bengaluru, India',
        period: 'Nov 2025 — Present',
        current: true,
        bullets: [
            'Designed and built an end-to-end agentic AI pipeline for automated travel expense compliance at Porsche AG — orchestrating document ingestion (AWS Textract/BDA), LLM-based rule evaluation, and confidence-scored routing across 15+ receipt types.',
            'Architected a two-plane policy-to-enforcement system using LLMs to parse regulatory documents into deterministic threshold rules and semantically evaluated rules — translating complex compliance logic into auditable AI decisions.',
            'Designed the backend architecture for an internal ideation platform across MHP Group — owning the PostgreSQL data model, API contracts, and service-layer logic for a Next.js + TypeScript full-stack application on AWS EC2.',
            'Built AWS CDK infrastructure stacks (TypeScript) for cross-account observability on a Porsche logistics platform — deploying CloudWatch dashboards, SNS alerting, and multi-region monitoring pipelines.',
        ],
    },
    {
        role: 'Software Engineer',
        company: 'Celstream Technologies',
        location: 'Bengaluru, India',
        period: 'Feb 2023 — Oct 2025',
        current: false,
        bullets: [
            'Designed and developed production REST APIs and modular service layers using Java 17 and Spring Boot for configuration and data management systems serving enterprise clients.',
            'Containerized Spring Boot applications with Docker and orchestrated rollouts via Kubernetes; established CI/CD pipelines using GitHub Actions and Jenkins, increasing deployment frequency by 32%.',
            'Amplified data query performance by designing a scalable microservices architecture with Node.js, Golang, and Docker, deploying GraphQL resolvers with strategic indexing and sharding.',
        ],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Experience</div>
                <h2 className="section-title">Where I've worked</h2>
                <p className="section-lead">
                    Building production AI systems and distributed backend services
                    at enterprise scale.
                </p>

                <div className="exp-timeline">
                    {experiences.map((exp) => (
                        <div key={exp.company} className={`exp-card${exp.current ? ' exp-current' : ''}`}>
                            <div className="exp-card-header">
                                <div>
                                    <div className="exp-role">{exp.role}</div>
                                    <div className="exp-company">{exp.company}</div>
                                </div>
                                <div className="exp-meta">
                                    <span className="exp-period">{exp.period}</span>
                                    <span className="exp-location">{exp.location}</span>
                                </div>
                            </div>
                            <ul className="exp-bullets">
                                {exp.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
