import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../Api";
import "./Admin.css";
import "../App.css"

const Admin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [main, setMain] = useState({
    about: "",
    skills: [],
    project: [],
    image: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`${server}/admin`, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(res)
        setUser(res.data.user);
        setMain(res.data.main);
        setAboutText(res.data.main.about);
      } catch (err) {
        console.log(err)
        navigate("/login");
      }
    };

    fetchAdminData();
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateAbout = async (e) => {
    e.preventDefault();
    await axios.put(
      `${server}/admin/about`,
      { about: aboutText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const addSkill = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${server}/admin/skill`,
      { skill: newSkill },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMain((prev) => ({ ...prev, skills: res.data.skills }));
    setNewSkill("");
  };


  const deleteSkill = async (skill) => {
    const res = await axios.delete(
      `${server}/admin/skill/${encodeURIComponent(skill)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMain((prev) => ({ ...prev, skills: res.data.skills }));
  };

  const addProject = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(newProject).forEach(([key, value]) =>
      data.append(key, value)
    );

    const res = await axios.post(`${server}/admin/project`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMain((prev) => ({
      ...prev,
      project: [...prev.project, res.data.project],
    }));

    setNewProject({ title: "", description: "", link: "", image: null });
  };


  const deleteProject = async (id) => {
    await axios.delete(`${server}/admin/project/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMain((prev) => ({
      ...prev,
      project: prev.project.filter((p) => p._id !== id),
    }));
  };


  const updateProfileImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", profileImage);

    const res = await axios.put(`${server}/admin/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMain((prev) => ({ ...prev, image: res.data.image }));
  };

  return (
    <div className="admin-page">
      <h1>Welcome, {user}</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* PROFILE IMAGE */}
      <h2>Add Profile Photo</h2>
      <form onSubmit={updateProfileImage}>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button>Add Image</button>
      </form>

      {/* ABOUT */}
      <h2>Update About</h2>
      <form onSubmit={updateAbout}>
        <textarea
          rows="5"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        <button>Update About</button>
      </form>

      {/* SKILLS */}
      <h2>Your Skills</h2>
      <div className="skills-grid">
        {main.skills.map((skill, i) => (
          <div className="skill-tag" key={i}>
            <span> {skill}</span>
            <button onClick={() => deleteSkill(skill)}>X</button>
          </div>
        ))}
      </div>

      <h2>Add Skill</h2>
      <form onSubmit={addSkill}>
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Skill name"
          required
        />
        <button>Add Skill</button>
      </form>

      {/* PROJECTS */}
      {main.project.map((proj) => (
        <div className="box" key={proj._id}>
          <div className="img-container">
            <img src={proj.image} alt={proj.title} />
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="view-link"
            >
              <i className="fa-solid fa-eye"></i>
            </a>
          </div>
          <h4>{proj.title}</h4>
          <p>{proj.description}</p>

          <button>
            {" "}
            <Link to={`/admin/project-edit/${proj._id}`}>Edit</Link>
          </button>
          <button onClick={() => deleteProject(proj._id)}>Delete</button>
        </div>
      ))}

      {/* ADD PROJECT */}
      <h2>Add Project</h2>
      <form onSubmit={addProject}>
        <input
          placeholder="Project title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          required
        /> <br />
        <input
          placeholder="Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          required
        /> <br />
        <input
          type="file"
          onChange={(e) =>
            setNewProject({ ...newProject, image: e.target.files[0] })
          }
          required
        /> <br />
        <input
          placeholder="Project link"
          value={newProject.link}
          onChange={(e) =>
            setNewProject({ ...newProject, link: e.target.value })
          }
        /> <br />
        <button>Add Project</button>
      </form>
    </div>
  );
};

export default Admin;
