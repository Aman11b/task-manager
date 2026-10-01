import type { NextFunction, Request, Response } from "express";
import express from "express";
import { createTaskController } from "./controllers/task.controller.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { createTaskRoutes } from "./routes/task.routes.js";
import { createTaskService } from "./services/task.service.js";
import { createPrismaTaskRepository } from "./repositories/prisma-task.repository.js"
import cors from "cors";

const app=express();


app.use(express.json())
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

// const taskRepository=createInMemoryTaskRepository();
const taskRepository=createPrismaTaskRepository();
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

app.use(errorHandler)

export default app