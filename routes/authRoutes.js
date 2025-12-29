const express = require("express");
const router = express.Router();
const User = require("../model/user")
const Main = require("../model/main")
const Project = require("../model/project")
const multer = require("multer");
const { cloudinary, storage } = require("../cloudinary");
const upload = multer({ storage });
const jwt = require("jsonwebtoken");
const jwtAuth = require('../middleware/auth')



router.get("/admin", jwtAuth, async (req, res) => {
    const main = await Main.findOne().populate("project");

    if (!main) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
        user: req.user.username,
        main
    });
});


router.get("/portfolio", async (req, res) => {
    let main = await Main.findOne().populate("project");
    if(!main){
       main = new Main({
        about:"its about section",
        skills:['html'],
        project:[]
       })
       await main.save();
    }
    res.json(main);
})


router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "invalid credentials" });

    let user = await User.findOne({ username });
    if (!user || user.password !== password) return res.status(401).json({ message: "invalid username or password" })


    const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );


    res.json({ message: "Login successful",token, user: user.username });
})

router.put("/admin/about",jwtAuth, async (req, res) => {
    let { about } = req.body;

    let main = await Main.findOne()
    if (!main) return res.status(404).json({ message: "Profile not found" });

    main.about = about;
    await main.save();
    res.json({ message: "About updated", about });
})

router.post("/admin/skill",jwtAuth, async (req, res) => {
    let { skill } = req.body;

    let main = await Main.findOne();
    if (main) {
        main.skills.push(skill)
        await main.save();
    }
    res.json({ message: "Skill added", skills: main.skills });
})

router.delete("/admin/skill/:skill",jwtAuth, async (req, res) => {
    let skill = decodeURIComponent(req.params.skill);

    let main = await Main.findOne();
    if (main) {
        main.skills = main.skills.filter(s => s !== skill)
        await main.save();
    }
    res.json({ message: "Skill removed", skills: main.skills });
})

router.put("/admin/project/:id", upload.single("image"), jwtAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title;
    project.description = description;
    project.link = link;
    if (req.file) {
            project.image = req.file.path;
    }
        await project.save();
    res.json({ message: "Project updated", project });
    
})

router.delete("/admin/project/:id",jwtAuth, async (req, res) => {
    let id = req.params.id;
    await Project.findByIdAndDelete(id);
    let main = await Main.findOne();

    if (main) {
        main.project = main.project.filter(pId => pId.toString() !== id)
        await main.save();
    }

    res.json({ message: "Project deleted" });

})

router.post("/admin/project", upload.single("image"),jwtAuth, async (req, res) => {
    let { title, description, link } = req.body
    const image = req.file.path;

    const project = new Project({
        title, description, link, image
    })
    await project.save();

    let main = await Main.findOne();
    if (main) {
        main.project.push(project._id)
        await main.save();
    }
    res.json({ message: "Project added", project });

})

router.put("/admin/profile",upload.single("image"), jwtAuth, async(req,res)=>{
    const image = req.file.path;
    let main = await Main.findOne();
    if(main){
        main.image = image;
        await main.save();
    }
    res.json({ message: "Profile image updated", image: main.image });
})

router.get("/admin/project/:id", jwtAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project fetched successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching project",
            error: error.message,
        });
    }
});



module.exports = router;