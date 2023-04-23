const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blogs")
const emailRoute=require("./routes/email")

var cors = require('cors')
//const config = require("config");

// Connect DB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Route
app.use("/api/user", userRoute);
app.use("/api/blog",blogRoute)
app.use("/api/email-sent",emailRoute)




port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`servers is running on port to ${port}`)
})



