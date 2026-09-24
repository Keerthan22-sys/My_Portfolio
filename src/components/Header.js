import { useState, useEffect } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="nav-inner">
                <a href="#app" className="nav-logo" onClick={close}>KGS</a>

                <button
                    className={`nav-toggle${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
                    <li><a href="#about" onClick={close}>About</a></li>
                    <li><a href="#experience" onClick={close}>Experience</a></li>
                    <li><a href="#projects" onClick={close}>Work</a></li>
                    <li><a href="#fundamentals" onClick={close}>Fundamentals</a></li>
                    <li><a href="#stack" onClick={close}>Stack</a></li>
                    <li><a href="#blog" onClick={close}>Blog</a></li>
                    <li><a href="#contact" onClick={close}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
