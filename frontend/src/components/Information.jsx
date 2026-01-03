import React from "react";

const Information = ({image}) => {
  return (
    <div className="side">
      <div className="first">
        <img src={image} alt="Vikash Pandey" />

        <div>
          <h2>Vikash Pandey</h2>
          <p>Full Stack Developer</p>
        </div>
      </div>

      <div className="second">
        <div className="contact-item">
          <a
            href="https://linkedin.com/in/vikash308"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
            <span> LinkedIn</span>
          </a>
        </div>

        <div className="contact-item">
          <a
            href="https://github.com/vikash308"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
            <span> GitHub</span>
          </a>
        </div>
        <div className="contact-item">
          <a
            href="https://leetcode.com/u/vikash6203vikash/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-code"></i>
            <span> LeetCode</span>
          </a>
        </div>

        <div className="contact-item">
          <i className="fa-solid fa-phone"></i>
          <a href="tel:+916203561308"> +91 62035 61308</a>
        </div>

        <div className="contact-item">
          <i className="fa-solid fa-envelope"></i>
          <a href="mailto:vp946203@gmail.com"> vp946203@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default Information;
