const express = require("express");
const router = express.Router();
const User = require("../model/user")
const Main = require("../model/main")
const Project = require("../model/project")
const multer = require("multer");
const { cloudinary, storage } = require("../cloudinary");
const upload = multer({ storage });


function isAuth(req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/login");
    }
}

router.get("/", async (req, res) => {
    let main = await Main.findOne({});
    if(!main){
       let main2 = new Main({
        about:"its about section",
        skills:'html'
       })
       await main2.save();
    }

    let project = await Project.find()
    if(!project){
       let project2 = new Project({
         title:"weather app",
        description:"it is a weather app",
        link:"enter link here"
       })
       await project2.save();

    }
    res.render("home", { main, project })
})



router.get("/login", (req, res) => {
    res.render("login", { message: "" })
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    console.log(username, password)
    if (!username || !password) return res.render("login", { message: "invalid credentials" });

    let user = await User.findOne({ username });
    if (!user) return res.render("login", { message: "not matched" })

    if (user.password != password) return render("login", { message: "not match" })

    req.session.isAuth = true;
    req.session.user = user.username;


    res.redirect("/admin")
})

router.get("/admin", isAuth, async (req, res) => {
    let main = await Main.findOne().populate("project")
    res.render("admin", { main, user: req.session.user })
})

router.get("/admin/logout",isAuth, (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect("/");
    });
})

router.post("/admin/update-about",isAuth, async (req, res) => {
    let { about } = req.body;

    let main = await Main.findOne()
    if (main) {
        main.about = about;
        await main.save();
    }
    res.redirect("/admin")
})

router.post("/admin/add-skill",isAuth, async (req, res) => {
    let { skill } = req.body;

    let main = await Main.findOne();
    if (main) {
        main.skills.push(skill)
        await main.save();
    }
    res.redirect("/admin")
})

router.get("/admin/delete-skill/:skill",isAuth, async (req, res) => {
    let skill = decodeURIComponent(req.params.skill);

    let main = await Main.findOne();
    if (main) {
        main.skills = main.skills.filter(s => s !== skill)
        await main.save();
    }
    res.redirect("/admin")
})

router.get("/admin/project-edit/:id",isAuth, async (req, res) => {
    let id = req.params.id;
    const project = await Project.findById(id);
    if (!project) return res.redirect("/admin");
    res.render("edit", { project })
})

router.post("/admin/project-edit/:id", upload.single("image"), isAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const project = await Project.findById(id);
    if (!project) return res.redirect("/admin");

    project.title = title;
    project.description = description;
    project.link = link;
    if (req.file) {
            project.image = req.file.path;
            await project.save();
    }
        await project.save();
        res.redirect("/admin");
    
})

router.get("/admin/project-delete/:id",isAuth, async (req, res) => {
    let id = req.params.id;
    await Project.findByIdAndDelete(id);
    let main = await Main.findOne();

    if (main) {
        main.project = main.project.filter(pId => pId.toString() !== id)
        await main.save();
    }
    res.redirect("/admin")

})

router.post("/admin/add-project", upload.single("image"),isAuth, async (req, res) => {
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
    res.redirect("/admin")

})

router.post("/admin/profile",upload.single("image"), isAuth, async(req,res)=>{
    const image = req.file.path;
    let main = await Main.findOne();
    if(main){
        main.image = image;
        await main.save();
    }
    res.redirect("/admin")
})



module.exports = router;