const express = require("express")
const router = express.Router()
const multer = require("multer")
const adminAuth = require("../middleware/adminAuth")

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null, Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})

router.post("/upload", adminAuth, upload.single("image"), async(req,res)=>{

const newDesign = new Design({
image:req.file.filename
})

await newDesign.save()

res.json({success:true})

})

module.exports = router