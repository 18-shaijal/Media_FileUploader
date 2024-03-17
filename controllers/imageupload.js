
// const { cloudinary } = require("../config/cloudinary");
const cloudinary= require("cloudinary").v2;
const File=require("../models/file");
//fileuploader handler function
exports.fileuploader=async(req,res)=>{
    try{
         const file=req.files.file;
         console.log("file aa gyi->",file);
         const path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
         console.log("path->",path);
         file.mv(path,(err)=>{
            console.log("error");
         })
         res.status(400).json({
            success:true,
            message:"file uploaded successfully"


         })

    }
    catch(err)
    {
       console.log(err);
    }
}
function issupported(filetype,supportedtype){
    return supportedtype.includes(filetype);
}
async function uploadtocloudinary(file,folder,quality){
    const options = { folder }
    console.log("File path");
    if(quality){
        options.quality=quality;
        }
    options.resource_type="auto";
    // Upload the file to Cloudinary and return the response
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageuploader=async(req,res)=>{
       try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags)
        const file=req.files.imagefile;
        console.log("file aa gyi->",file);
        const filetype=file.name.split('.')[1].toLowerCase();
        const supportedtype=["jpg","png","jpeg"];
        
        if(!issupported(filetype,supportedtype))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        
            
        }
        console.log("uploading");
        const response=await  uploadtocloudinary(file,"Mymedia")
        console.log("goes");
        console.log(response);
        const filedata=await File.create(
            {
                name,tags,email,
                imageUrl:response.secure_url
            }
        )
       return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"media uploaded successfully"
        })
        
       }
       catch(err)
       {
            res.status(400).json({
            success:false,
            message:"smthing went wrong"
           })
       }
}
exports.videouploader=async(req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags)
        const file=req.files.videofile;
        console.log("file aa gyi->",file);
        const filetype=file.name.split('.')[1].toLowerCase();
        const supportedtype=["mp4","mov"];
        
        if(!issupported(filetype,supportedtype))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        
            
        }
        console.log("uploading");
        const response=await  uploadtocloudinary(file,"Mymedia")
        console.log("goes");
        console.log(response);
        const filedata=await File.create(
            {
                name,tags,email,
                imageUrl:response.secure_url
            }
        )
       return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"media uploaded successfully"
        })
        
       }
       catch(err)
       {
            res.status(400).json({
            success:false,
            message:"smthing went wrong"
           })
       }

}
exports.imagereduceruploader=async(req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags)
        const file=req.files.imagefile;
        console.log("file aa gyi->",file);
        const filetype=file.name.split('.')[1].toLowerCase();
        const supportedtype=["jpg","jpeg","png"];
        
        if(!issupported(filetype,supportedtype))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        
            
        }
        console.log("uploading");
        const response=await  uploadtocloudinary(file,"Mymedia",30);
        console.log("goes");
        console.log(response);
        const filedata=await File.create(
            {
                name,tags,email,
                imageUrl:response.secure_url
            }
        )
       return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"media uploaded successfully"
        })
        
       }
       catch(err)
       {
            res.status(400).json({
            success:false,
            message:"smthing went wrong"
           })
       }
}