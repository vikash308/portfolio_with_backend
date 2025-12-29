import React from "react";

const Projects = ({projects}) => {
 

  return (
    <div className="project" id="project">
      <h1>Projects</h1>

      <div className="project-list">
        {projects.length > 0 ? (
          projects
            .slice()
            .reverse()
            .map((proj) => (
              <div className="box" key={proj.id}>
                <div className="img-container">
                  <img src={proj.image} alt={proj.title} />

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-link"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </a>
                  )}
                </div>

                <h4>{proj.title}</h4>
                <p>{proj.description}</p>
              </div>
            ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
      <div className="line"></div>
    </div>
  );
};

export default Projects;
