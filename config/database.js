const mongoose= require("mongoose");
require("dotenv").config;
const dbconnnect=mongoose.connect(process.env.DATABASE_URL,{

}).then(()=>console.log("connection successfull"))
.catch((err)=>{
    console.log("error occur");
    process.exit(1);
}
)
module.exports=dbconnnect;