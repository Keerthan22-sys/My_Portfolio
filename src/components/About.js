const About = () => {
    const stats = [
        {
            icon: '🏆',
            value: 'National Winner',
            label: 'Smart India Hackathon 2022 — beat thousands of teams across the country'
        },
        {
            icon: '🚀',
            value: 'Top 20 / 625',
            label: 'FKCCI Manthan business plan competition — top 3% finish'
        },
        {
            icon: '📐',
            value: 'AIR 5469',
            label: 'National Engineering Olympiad — merit scholarship from Marubeni India'
        },
        {
            icon: '🤖',
            value: 'Multi-Agent Builder',
            label: 'A2A + MCP protocol systems, CrewAI pipelines, and autonomous research agents'
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
                            I'm an AI Engineer based in India, actively targeting <strong>early-stage
                            YC-backed startups</strong> where I can have real, outsized impact. I
                            build AI systems end-to-end — from researching the right model architecture
                            to shipping a product that users actually love.
                        </p>
                        <p>
                            My approach is unusual: I study AI from <strong>first principles</strong> —
                            implementing autograd from scratch, building BPE tokenizers,
                            training GPTs — while simultaneously shipping multi-agent systems
                            using the latest protocols like <strong>A2A and MCP</strong>.
                        </p>
                        <p>
                            I have a <strong>founder's mindset</strong>. I think about the user,
                            the business model, and the technical architecture simultaneously.
                            That's what makes AI engineering interesting to me — it's not just
                            about making the model work, it's about making a product people need.
                        </p>
                        <p>
                            Previously led teams in national hackathons, won Smart India
                            Hackathon 2022 nationally, and placed top 3% in a 625-team
                            business competition. Open to work on hard problems where
                            AI is the core product, not a feature.
                        </p>
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
