const express = require("express")
const router = express.Router()
const multer = require("multer")
const Order = require("../models/Order")

const storage = multer.diskStorage({

destination:"uploads/",

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}

})

const upload = multer({storage})

router.post("/", upload.single("reference"), async(req,res)=>{

const order = new Order({

name:req.body.name,
email:req.body.email,
service:req.body.service,
details:req.body.details,
reference:req.file?.filename

})

await order.save()

res.json({message:"Order submitted successfully"})

})

module.exports = router


const adminAuth = require("../middleware/adminAuth")

router.get("/admin/orders", adminAuth, async(req,res)=>{

const orders = await Order.find().sort({createdAt:-1})

res.json(orders)

})

router.put("/:id/status", adminAuth, async(req,res)=>{

const order = await Order.findById(req.params.id)

order.status = req.body.status

await order.save()

res.json(order)

})