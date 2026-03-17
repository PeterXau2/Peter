const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

name:String,

followers:[String],

following:[String]

})

module.exports = mongoose.model("User",userSchema)