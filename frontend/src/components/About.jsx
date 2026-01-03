import React from "react";

const About = ({ about, skills }) => {
  return (
    <div className="about">
      <h1>About Me</h1>

      <p>{about? about : "Wait sometime until the data is loaded from server. Its dynamic portfolio data show from database"}</p>

      <div className="line"></div>

      <div className="education">
        <h1>Education</h1>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Bachelor of Computer Applications (BCA)</h3>
              <span>2023 – 2026</span>
              <p>
                Currently pursuing BCA to build a strong foundation in
                programming, databases, computer networks, and web technologies.
              </p>
            </div>
          </div>
        </div>

        <div className="line"></div>

        <div className="skill">
          <h1>My Skills</h1>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-tag" key={index}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default About;
