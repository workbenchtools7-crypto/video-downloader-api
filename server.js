const express = require("express")
const cors = require("cors")
const ytdlp = require("yt-dlp-exec")

const app = express()

app.use(cors())

app.get("/", (req,res)=>{
res.json({
status:"API ONLINE"
})
})

app.get("/download", async (req,res)=>{

const url = req.query.url

if(!url){
return res.json({erro:"URL não enviada"})
}

try{

const info = await ytdlp(url,{
dumpSingleJson:true
})

const downloads = info.formats
.filter(f => f.ext === "mp4")
.map(f => ({
qualidade: f.format_note || (f.height+"p"),
url: f.url
}))

res.json({
titulo: info.title,
thumbnail: info.thumbnail,
downloads: downloads.slice(0,5)
})

}catch(e){

res.json({
erro:"Erro ao processar vídeo"
})

}

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("API rodando")
})
