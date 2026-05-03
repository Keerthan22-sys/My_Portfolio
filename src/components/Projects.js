import data from '../data/projects.json';
import { HiArrowRight } from 'react-icons/hi';

const Projects = () => {
    return (
        <section id="projects" className="projects section">
            <div className="section-label">Work</div>
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {data.map((project, key) => (
                    <div key={key} className="project-card">
                        <div className="project-card-name">{project.name}</div>
                        <p className="project-card-desc">{project.description}</p>
                        <div className="project-card-footer">
                            <a
                                className="project-link"
                                target="_blank"
                                href={project.link}
                                rel="noreferrer"
                            >
                                View project <HiArrowRight />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
