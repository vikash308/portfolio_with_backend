import React from "react";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <h1>Contact Me</h1>

      <p>
        I'd love to hear from you! Fill out the form below or email me directly
        at <a href="mailto:vp946203@gmail.com">vp946203@gmail.com</a>
      </p>

      <form
        className="contact-form"
        action="mailto:vikash308x@gmail.com"
        method="POST"
        encType="text/plain"
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
