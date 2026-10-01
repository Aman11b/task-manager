import express from "express"
import type { Request,Response,NextFunction } from "express"
import { createInMemoryTaskRepository } from "./repositories/in-memory-task.repository.js";
import { createTaskService } from "./services/task.service.js";
import { createTaskController } from "./controllers/task.controller.js";
import { createTaskRoutes } from "./routes/task.routes.js";

const app=express();

app.use(express.json())

const taskRepository=createInMemoryTaskRepository();
const taskService=createTaskService(taskRepository);
const TaskController=createTaskController(taskService);
const taskRoutes=createTaskRoutes(TaskController)

app.get("/health",(_req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        data:{
            status:"UP"
        }
    });
});

app.use("/api/v1/tasks",taskRoutes)

app.use((_req:Request,res:Response,_next:NextFunction)=>{
    res.status(404).json({
        success:false,
        error:{
            code:"ROUTE_NOT_FOUND",
            message:"The request route was not found.",
            details:[],
        },
    });
});

export default app