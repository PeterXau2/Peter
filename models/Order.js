const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

name:String,
email:String,
service:String,
details:String,
reference:String,

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Order",orderSchema)


const axios = require("axios")

router.post("/pay", async(req,res)=>{

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