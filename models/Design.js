const mongoose = require("mongoose")

const designSchema = new mongoose.Schema({

image:String,

likes:{
type:Number,
default:0
},

views:{
type:Number,
default:0
},

likedUsers:[String],

favorites:[String],

comments:[
{
user:String,
text:String,
createdAt:{
type:Date,
default:Date.now
}
}
],

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Design", designSchema)