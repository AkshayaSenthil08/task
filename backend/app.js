const express=require("express")
const dotenv=require("dotenv")
const path=require("path")
const cors=require("cors")

const user=require("./routes/userRoutes")
const task=require("./routes/taskRoutes")

const connectDatabase=require("./config/connectDatabase")

dotenv.config({ path: path.join(__dirname, "config", "config.env") });


const app=express()
connectDatabase();

app.use(express.json())
app.use(cors())

app.use("/api/v1",user)
app.use("/api/v1",task)
const PORT=process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

