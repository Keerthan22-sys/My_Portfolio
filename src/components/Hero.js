import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

const Hero = () => {
    return (
        <section className="hero" id="hero">
            <div className="hero-inner">

                <div className="hero-status">
                    <span className="hero-status-dot" aria-hidden="true" />
                    Open to roles at early-stage AI startups
                </div>

                <h1 className="hero-headline">
                    I build AI<br />
                    <span className="hero-headline-accent">that ships.</span>
                </h1>

                <p className="hero-sub">
                    AI Engineer focused on <strong>LLMs, autonomous agents, and
                    multi-agent systems</strong>. I understand the stack from
                    autograd to production — and I move fast.
                </p>

                <div className="hero-ctas">
                    <a
                        href="https://drive.google.com/file/d/1ohGKAOheMgqnuN7OJJnG8J6uSeQQIopJ/view?usp=sharing"
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
