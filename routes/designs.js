const express = require("express")
const router = express.Router()
const multer = require("multer")
const Design = require("../models/Design")
const adminAuth = require("../middleware/adminAuth")

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})

router.post("/upload", adminAuth, upload.single("image"), async(req,res)=>{

const design = new Design({
image:req.file.filename
})

await design.save()

res.json(design)

})

router.get("/", async(req,res)=>{
const designs = await Design.find().sort({createdAt:-1})
res.json(designs)
})

module.exports = router





router.post("/:id/like", async(req,res)=>{

const design = await Design.findById(req.params.id)

design.likes++

await design.save()

res.json({likes:design.likes})

})



router.post("/:id/comment", async(req,res)=>{

const {user,text} = req.body

const design = await Design.findById(req.params.id)

design.comments.push({
user,
text
})

await design.save()

res.json(design.comments)

})

router.post("/:id/view", async(req,res)=>{

const design = await Design.findById(req.params.id)

design.views++

await design.save()

res.json({views:design.views})

})

router.post("/:id/favorite", async(req,res)=>{

const design = await Design.findById(req.params.id)

design.favorites.push("user")

await design.save()

res.json(design.favorites)

})


router.post("/follow/:id", async(req,res)=>{

const user = await User.findById(req.params.id)

user.followers.push("visitor")

await user.save()

res.json(user.followers.length)

})

router.get("/trending", async(req,res)=>{

const designs = await Design.find()
.sort({likes:-1})
.limit(6)

res.json(designs)

})