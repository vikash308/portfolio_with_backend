const mongoose  = require("mongoose");


const schema = new mongoose.Schema({
    about:String,
    skills:Array,
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    image:String
})

const Main = mongoose.model("Main",schema)
module.exports = Main;