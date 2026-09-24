import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const Hero = () => {
    return (
        <section className="hero" id="hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="hero-inner">

                <div className="hero-status">
                    <span className="hero-status-dot" aria-hidden="true" />
                    AI Consultant at MHP India — A Porsche Company
                </div>

                <h1 className="hero-headline">
                    I build AI systems<br />
                    <span className="hero-headline-accent">that ship.</span>
                </h1>

                <p className="hero-sub">
                    Software Engineer specializing in <strong>AI agents, RAG pipelines,
                    multi-agent orchestration</strong>, and <strong>distributed backend
                    services</strong>. From LLM fine-tuning to cloud-native deployment —
                    I own the full stack.
                </p>

                <div className="hero-ctas">
                    <a
                        href="https://drive.google.com/file/d/1Fo_ODA66Xve9WBEUFX7SfZTsESMSBpNa/view?usp=drive_link"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                    >
                        <HiDocumentText className="btn-icon" />
                        Resume
                    </a>
                    <a
                        href="https://github.com/Keerthan22-sys"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost"
                    >
                        <FaGithub className="btn-icon" />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/keerthangowdas/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost"
                    >
                        <FaLinkedin className="btn-icon" />
                        LinkedIn
                    </a>
                    <a
                        href="https://x.com/keerthangowdas1"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost"
                    >
                        <FaTwitter className="btn-icon" />
                        X
                    </a>
                </div>

                <div className="hero-scroll" aria-hidden="true">
                    <span className="hero-scroll-line" />
                    scroll
                </div>
            </div>
        </section>
    );
};

export default Hero;
