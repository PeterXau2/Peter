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

module.exports = mongoose.model("Order", orderSchema)