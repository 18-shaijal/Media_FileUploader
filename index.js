const express=require("express");
const app=express();

require("dotenv").config();

const PORT=process.env.PORT||6000;
app.use(express.json());
//import routes
// const blogRoute=require("./routers/router");
// app.use("/api/blog",blogRoute);

// connect to db
const dbconnect= require("./config/database");
// dbconnect.connect();
//cloud se connect krna hh 
const cloud=require("./config/cloudinary");
cloud.cloudinary();
//middleware for file uploading
const fileupload= require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}
    

));
//api route mount krna hh
const upload=require("./routers/route");
app.use("/api/v1/upload",upload);
// start server
app.listen(PORT,()=>{
    console.log("server started")
})