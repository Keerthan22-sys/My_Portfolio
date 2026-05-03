import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const Body = () => {
    return (
        <section id="body" className="body">
            <div className="body-container">
                <div className="body-label">Available for opportunities</div>
                <h1 className="body-headline">Keerthan Gowda S</h1>
                <div className="body-role">AI Engineer</div>
                <p className="body-tagline">
                    Building intelligent systems at the intersection of machine learning,
                    infrastructure, and product. Focused on turning research into reliable,
                    scalable AI applications.
                </p>
                <div className="body-icons">
                    <a
                        href="https://drive.google.com/file/d/1ohGKAOheMgqnuN7OJJnG8J6uSeQQIopJ/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-link primary"
                    >
                        Resume <HiArrowRight />
                    </a>
                    <a
                        href="https://github.com/Keerthan22-sys"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-link"
                    >
                        <FaGithub /> GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/keerthangowdas/"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-link"
                    >
                        <FaLinkedin /> LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Body;
