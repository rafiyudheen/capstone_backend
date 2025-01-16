const express=require("express")
const cors=require("cors")
const dbConfig=require("./config/dbConfig");
const userRouter=require("./routers/userRouter")
const app=express()
const port=3000


app.use(cors())
app.use(express.json())

dbConfig();
app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`app listerning @ ${port}`)
})