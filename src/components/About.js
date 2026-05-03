const About = () => {
    return (
        <section id="about" className="about section">
            <div className="section-label">Background</div>
            <h2 className="section-title">About Me</h2>
            <div className="about-body">
                <div className="about-text">
                    <p>
                        I'm an AI Engineer passionate about building intelligent systems
                        that solve real-world problems. My work spans the full ML lifecycle —
                        from research and experimentation to deployment and monitoring in
                        production environments.
                    </p>
                    <p>
                        With a strong foundation in <strong>Python, deep learning frameworks,
                        and cloud infrastructure</strong>, I focus on creating AI applications
                        that are reliable, interpretable, and genuinely useful.
                    </p>
                    <p>
                        Outside of engineering, I think deeply about the entrepreneurial
                        side of AI — how intelligent products create value and what it
                        takes to build them at scale.
                    </p>
                </div>
                <div className="about-highlights">
                    <div className="highlight-card">
                        <h4>Smart India Hackathon 2022 — Winner</h4>
                        <p>Built a digital payment solution for Aadhar Seva Kendra that won nationally.</p>
                    </div>
                    <div className="highlight-card">
                        <h4>FKCCI Manthan — Top 20 / 625 Teams</h4>
                        <p>Led a team to a top-20 finish in a prestigious national business plan competition.</p>
                    </div>
                    <div className="highlight-card">
                        <h4>National Engineering Olympiad — AIR 5469</h4>
                        <p>Achieved an all-India rank and recognized with a scholarship from Marubeni India.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
