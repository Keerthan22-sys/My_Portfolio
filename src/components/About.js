const About = () => {
    const stats = [
        {
            icon: '🏆',
            value: 'National Winner',
            label: 'Smart India Hackathon 2022 (UIDAI/MeitY, Govt. of India)',
        },
        {
            icon: '🎤',
            value: 'Speaker',
            label: '2-Day Faculty Development Programme on Multi-Agent AI Systems — Ramaiah Institute of Technology (July 2026)',
        },
        {
            icon: '🚀',
            value: 'Top 20 / 625',
            label: 'FKCCI Manthan business plan competition — top 3% finish',
        },
        {
            icon: '🎓',
            value: 'AIR 5469',
            label: 'National Engineering Olympiad — Marubeni India Merit Scholarship recipient',
        },
    ];

    const education = [
        {
            degree: 'M.S. — Computer Science',
            school: 'Scaler x Woolf University',
            period: 'Jan 2025 — Nov 2026',
            detail: 'GPA: 3.8 | Focus: Distributed Systems, Production ML/AI, System Design',
        },
        {
            degree: 'B.E. — Computer Science',
            school: 'Visvesvaraya Technological University',
            period: 'Aug 2019 — May 2023',
            detail: 'CGPA: 8.74 | Data Structures & Algorithms, Machine Learning, Software Engineering',
        },
    ];

    return (
        <section id="about" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Background</div>
                <h2 className="section-title">Keerthan Gowda S</h2>
                <div className="about-grid">
                    <div className="about-bio">
                        <p>
                            I'm a <strong>Software Engineer</strong> specializing in
                            AI and backend systems, currently building agentic AI
                            pipelines at <strong>MHP India — A Porsche Company</strong>.
                            I design systems end-to-end — from LLM-based rule evaluation
                            to cloud-native deployment on AWS.
                        </p>
                        <p>
                            My approach bridges <strong>first-principles understanding</strong> with
                            production engineering. I've implemented autograd from scratch, trained
                            GPTs, and built BPE tokenizers — while simultaneously shipping multi-agent
                            systems using <strong>MCP, A2A, and CrewAI</strong> in enterprise environments.
                        </p>
                        <p>
                            Before MHP, I spent 2.5 years at <strong>Celstream Technologies</strong> building
                            production REST APIs, containerized microservices, and CI/CD pipelines
                            with Java, Spring Boot, and Kubernetes. I bring both the AI depth and
                            the backend rigor.
                        </p>

                        <div className="about-education">
                            <h3 className="about-education-title">Education</h3>
                            {education.map((ed) => (
                                <div key={ed.degree} className="edu-item">
                                    <div className="edu-degree">{ed.degree}</div>
                                    <div className="edu-school">{ed.school} <span className="edu-period">{ed.period}</span></div>
                                    <div className="edu-detail">{ed.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="about-stats">
                        {stats.map((s) => (
                            <div key={s.value} className="stat-card">
                                <div className="stat-card-icon">{s.icon}</div>
                                <div className="stat-card-value">{s.value}</div>
                                <div className="stat-card-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
