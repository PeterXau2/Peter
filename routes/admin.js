const express = require("express")
const router = express.Router()

router.post("/login",(req,res)=>{

if(req.body.password === process.env.ADMIN_TOKEN){
return res.json({success:true})
}

res.status(403).json({success:false})

})

module.exports = router