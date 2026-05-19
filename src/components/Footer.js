import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail, HiDocumentText } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <h2 className="footer-cta-title">
                        Let's build something<br />
                        <span>worth shipping.</span>
                    </h2>
                    <p className="footer-cta-sub">
                        Looking for a founding-team AI engineer at your YC startup?
                        I'm available — let's talk.
                    </p>
                    <div className="footer-social">
                        <a href="mailto:keerthangowdas222@gmail.com">
                            <HiMail /> keerthangowdas222@gmail.com
                        </a>
                        <a
                            href="https://www.linkedin.com/in/keerthangowdas/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a
                            href="https://github.com/Keerthan22-sys"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub /> GitHub
                        </a>
                        <a
                            href="https://x.com/keerthangowdas1"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaTwitter /> @keerthangowdas1
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1Fo_ODA66Xve9WBEUFX7SfZTsESMSBpNa/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <HiDocumentText /> Resume
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="footer-copy">
                        © 2026 Keerthan Gowda S
                    </span>
                    <span className="footer-made">
                        Built with React · Deployed on Vercel
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
