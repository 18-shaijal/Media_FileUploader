const express=require("express");
const router=express.Router();
const {fileuploader,imageuploader,videouploader,imagereduceruploader}=require("../controllers/imageupload")
router.post("/fileuploader",fileuploader);
router.post("/imageuploader",imageuploader);
router.post("/videouploader",videouploader);
router.post("/imagereduceruploader",imagereduceruploader)
module.exports = router;