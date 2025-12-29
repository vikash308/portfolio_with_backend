import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import server from "../Api";
import "./admin.css";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const token = localStorage.getItem("token");
 useEffect(() => {

   const fetchProject = async () => {
     try {
       const res = await axios.get(`${server}/admin/project/${id}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       const project = res.data.project; 

       setFormData({
         title: project.title || "",
         description: project.description || "",
         link: project.link || "",
       });

       setPreview(project.image || "");
     } catch (err) {
       console.error(err);
       navigate("/admin");
     }
   };

   fetchProject();
 }, [id, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("link", formData.link);
      if (image) data.append("image", image);

      await axios.put(`${server}/admin/project/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,}
      });

      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <h1>Edit Project</h1>

      <Link to="/admin" className="back-btn">
        ← Back to Admin
      </Link>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Project Link:</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />

        <label>Project Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Project Preview"
            width="200"
            style={{ marginTop: "10px" }}
          />
        )}

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default Edit;
