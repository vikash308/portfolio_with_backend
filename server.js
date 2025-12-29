require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const app = express();
const cors = require("cors")
const methodOverride = require("method-override")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [process.env.FRONTEND_URL1, "http://localhost:5173"],
  credentials: true
}))

app.use(methodOverride('_method'))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");

    // 🔥 SERVER START ONLY AFTER DB CONNECT
    app.use(authRoutes);

    app.listen(3000, () => {
      console.log("Server running on 3000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });