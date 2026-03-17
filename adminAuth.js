module.exports = function(req,res,next){

const token = req.headers.authorization

if(token !== process.env.ADMIN_TOKEN){
return res.status(403).json ({msg:"Unauthorized"})
}

next()

}