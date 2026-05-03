import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <span className="footer-copy">
                © 2025 Keerthan Gowda S · keerthangowdas222@gmail.com
            </span>
            <div className="footer-links">
                <a href="https://github.com/Keerthan22-sys" target="_blank" rel="noreferrer" className="footer-link">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/keerthangowdas/" target="_blank" rel="noreferrer" className="footer-link">
                    <FaLinkedin />
                </a>
                <a href="https://x.com/keerthangowdas1" target="_blank" rel="noreferrer" className="footer-link">
                    <FaTwitter />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
