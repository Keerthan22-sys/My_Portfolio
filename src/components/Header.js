const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <a href="#app">kg.</a>
            </div>
            <nav className="header-container">
                <div className="nav-item"><a href="#about">about</a></div>
                <div className="nav-item"><a href="#projects">projects</a></div>
                <div className="nav-item"><a href="#skills">skills</a></div>
                <div className="nav-item"><a href="#footer">contact</a></div>
            </nav>
        </header>
    );
};

export default Header;
