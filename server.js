require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const app = express();
const path = require("path")
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const Project = require("./model/project")
const Main = require("./model/main")
const multer = require("multer");



const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});
app.use(session({
  secret: "secretKey123",
  resave: false,
  saveUninitialized: false,
  store: store
}));


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("some error in database connection",err)
})


app.use(authRoutes)



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`sever is listening on ${port}`)
})