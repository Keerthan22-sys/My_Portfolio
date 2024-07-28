import { FaLinux, FaAndroid, FaFigma, FaJava, FaAws, FaPython, FaJs, FaReact, FaHtml5, FaCss3, FaGithub, FaDocker } from "react-icons/fa";

const Skills = () => {
    const skillsArr = [
        {
            "name" : 'Python',
            "icon" : FaPython
        },
        {
            "name" : 'Java',
            "icon" : FaJava
        },
        {
            "name" : 'JavaScript',
            "icon" : FaJs
        },
        {
            "name" : "React",
            "icon" : FaReact
        },
        {
            "name" : "Android",
            "icon" : FaAndroid
        },
        {
            "name" : "Git",
            "icon" : FaGithub
        },
        {
            "name" : "AWS",
            "icon" : FaAws
        },
        {
            "name" : "Docker",
            "icon" : FaDocker
        },
        {
            "name" : "Linux",
            "icon" : FaLinux
        }
    ];

    return (
        <div id='skills' className='skills'>
            <h2 className='title'>Skills</h2>
            <div className='skill-holder'>
                {
                    skillsArr.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <i key={index} className='skill-cards'>
                                <Icon className='skill-icon'/>
                                <p
                                className="skill"
                                >
                                    {skill.name}
                                </p>
                            </i>
                        )
                    })                    
                }
            </div>
        </div>
    )
}

export default Skills;
