const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","done"],
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

module.exports=mongoose.model("tasks",taskSchema)