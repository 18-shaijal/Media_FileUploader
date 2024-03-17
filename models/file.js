const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config;
const fileschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    }
});
fileschema.post("save",async function(doc){
    try{
        console.log("DOC->",doc);
        //transporter
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
        //send mail
        let info=await transporter.sendMail({
            from:`Shaijal Gupta`,
            to:doc.email,
            subject:"Clodinary file uploaded successfuly",
            html:`<h1>MAil send to the mail</h1><a href="${doc.imageUrl}">`
        })

    }
    catch(err)
    {
        console.log(err);

    }
})
const File=mongoose.model("File",fileschema);
module.exports=File;