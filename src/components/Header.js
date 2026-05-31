const Header = () => {
    return (
        <nav className="nav" role="navigation" aria-label="Main navigation">
            <div className="nav-inner">
                <a href="#app" className="nav-logo">Keerthan Gowda S</a>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Work</a></li>
                    <li><a href="#fundamentals">Fundamentals</a></li>
                    <li><a href="#stack">Stack</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
