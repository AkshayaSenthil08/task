const tasks=require("../models/taskModel");
const { findOneAndDelete } = require("../models/userModel");

exports.createTask=async(req,res)=>{

    const{title,desc}=req.body;
    
    const task=await tasks.create({
        title,
        desc,
        userId:req.user.id
    })

    res.json({
        success:true,
      message:"done",
      task
    })
}

exports.getTasks=async(req,res)=>{

    const task=await tasks.find({userId:req.user.id})

    res.json({
        success:true,
        message:"got tasks",
        task
    })
}

exports.updateTask=async(req,res)=>{
    
    const task=await tasks.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        {new:true}
    )

    if(!task){
        return res.json({
            success:false,
            message:"Task not Found"
        })
    }

    res.json({
        success:true,
        message:"Task Updated"
    })

}


exports.deleteTask=async(req,res)=>{

    const task=await tasks.findOneAndDelete(
         { _id: req.params.id, userId: req.userId }
    )

     if(!task){
        return res.json({
            success:false,
            message:"Task not Found"
        })
    }

    res.json({
        success:true,
        message:"Task Deleted"
    })


}