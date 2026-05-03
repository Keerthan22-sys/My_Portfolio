const Skills = () => {
    const categories = [
        {
            label: "Languages",
            skills: ["Python", "JavaScript", "TypeScript", "Java", "Go", "SQL"]
        },
        {
            label: "AI / ML",
            skills: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "scikit-learn", "OpenCV", "RAG", "LLM Fine-tuning"]
        },
        {
            label: "Infrastructure",
            skills: ["AWS", "Docker", "Linux", "Git", "FastAPI", "Django", "React"]
        }
    ];

    return (
        <section id="skills" className="skills section">
            <div className="section-label">Expertise</div>
            <h2 className="section-title">Skills</h2>
            <div className="skills-categories">
                {categories.map((cat) => (
                    <div key={cat.label}>
                        <div className="skill-category-label">{cat.label}</div>
                        <div className="skill-tags">
                            {cat.skills.map((s) => (
                                <span key={s} className="skill-tag">{s}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
