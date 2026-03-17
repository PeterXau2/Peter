const express = require("express")
const router = express.Router()
const axios = require("axios")

router.post("/pay", async(req,res)=>{

try{

const response = await axios.post(
"https://api.paystack.co/transaction/initialize",
{
email:req.body.email,
amount:500000
},
{
headers:{
Authorization:"Bearer " + process.env.PAYSTACK_SECRET,
"Content-Type":"application/json"
}
}
)

res.json(response.data)

}catch(err){

console.log(err)
res.status(500).json({error:"Payment failed"})

}

})

module.exports = router