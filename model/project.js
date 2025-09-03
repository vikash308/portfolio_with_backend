const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    link:String
})


const Project = mongoose.model("Project",schema)
module.exports = Project


