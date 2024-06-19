import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer-contact-info">
                <h1 className="footer-heading">Connect With Me</h1>
                <p className="footer-contact-access">Email: keerthangowdas222@gmail.com</p>
                <p className="footer-contact-access">Mobile: +919845871477</p>
            </div>
            <div>
                <h1>Social Links</h1>
                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/keerthangowdas"><i><FaLinkedin /></i></a>
                    <a href="https://www.instagram.com/keerthan_keer22/"><i><FaInstagram /></i></a>
                    <a href="https://x.com/keerthangowdas1"><i><FaTwitter /></i></a>
                    <a href="https://github.com/Keerthan22-sys"><i><FaGithub /></i> </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;