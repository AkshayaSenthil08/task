const express=require("express")
const authMiddleware=require("../middleware/authMiddleware")

const{createTask,getTasks,updateTask,deleteTask}=require("../controller/taskController")

const router=express.Router();

router.get("/getTask",authMiddleware,getTasks)
router.post("/newTask",authMiddleware,createTask)
router.put("/updateTask/:id",authMiddleware,updateTask)
router.delete("/deleteTask/:id",authMiddleware,deleteTask)

module.exports=router;