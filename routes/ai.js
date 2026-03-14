const express = require("express")
const router = express.Router()
const OpenAI = require("openai")

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

router.post("/generate-logo", async (req,res)=>{

const prompt = req.body.prompt

try{

const result = await openai.images.generate({
model: "gpt-image-1",
prompt: `modern logo design, clean vector style: ${prompt}`,
size: "1024x1024"
})

res.json({
image: result.data[0].url
})

}catch(err){
console.log(err)
res.status(500).json({error:"AI generation failed"})
}

})

module.exports = router