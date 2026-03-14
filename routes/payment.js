const express = require("express")
const router = express.Router()
const axios = require("axios")

router.post("/pay", async (req,res)=>{

const response = await axios.post(
"https://api.paystack.co/transaction/initialize",
{
email:req.body.email,
amount:500000
},
{
headers:{
Authorization:"Bearer "+process.env.PAYSTACK_SECRET
}
}
)

res.json(response.data)

})

module.exports = router