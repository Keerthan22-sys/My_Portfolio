import IMG from '../assets/Keerthan.jpg';

const About = () => {
    return (
        <div id="about" className="about">
            <h1 className="about-heading">About Me</h1>
            <div className="about-info">
                <p className="about-desc">
                    <li>
                    Technology Enthusiast and Aspiring Enterpreneur with <strong>Enterpreneurial mindset</strong> 
                    </li>
                    <li>
                    <strong>Award-Winning Innovator:</strong> Led my team to secure a <b>top 20 finish out of 625 teams</b> in a prestigious business plan competition by FKCCI Manthan. Won the <strong>Smart India Hackathon 2022</strong> with a digital payment solution for Aadhar Seva Kendra.
                    </li>
                    <li>
                    <strong>Accomplished Academic Background:</strong> Achieved an impressive AIR of 5469 in the <strong>National Engineering Olympiad.</strong> Recognized with a Rs. 50,000 scholarship from <b>Marubeni India</b> for academic excellence.
                    </li>
                   {/* <li>
                    <strong>Research and Technical Expertise:</strong> Presented a research paper on <b>Edge Computing</b> listed in college proceedings. Proficient in SQL, Cloud Computing, Apex programming, and embedded systems development with <b>STMicroelectronics and Texas Instruments.</b>
                    </li>
                    <li> 
                    <strong>Leadership and Team Collaboration:</strong> Successfully led teams as a <b>Team Leader</b> and volunteered extensively with NSS, demonstrating strong leadership, communication, and coordination skills.
                    </li>
                    <li>
                    <strong>Technical Skills and Project Management:</strong> <b>Developed</b> Salesforce applications, optimized scanner drivers, and <b>designed</b> LCD interfaces, ensuring high-quality deliverables through effective <b>API integration</b> and client-focused <b>project management.</b>
                    </li> */}
                </p>
                <div className="about-img">
                  {/*  <div className="about-img-wrapper">
                        <img src={IMG} alt="Detective" />
                    </div>  */}
                </div>
            </div>
        </div>
    )
}

export default About;