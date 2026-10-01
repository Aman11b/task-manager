import type { Request, Response } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../schemas/task.schema.js";
import { createTaskService } from "../services/task.service.js";
import { AppError } from "../errors/app-error.js";


type TaskService = ReturnType<typeof createTaskService>;

export function createTaskController(service:TaskService){

    async function create(req:Request,res:Response):Promise<void>{
 
        const input=req.body as CreateTaskDto;
        const task=await service.createTask(input);
        res.status(201).json({success:true,data:task})
       
    }

    async function getAll(_req:Request,res:Response):Promise<void> {

        const tasks=await service.getAllTasks();
        res.status(200).json({success:true,data:tasks});
       
    }


    async function getById(req:Request,res:Response):Promise<void>{
       
        const {id}=req.params;
        // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
        if(typeof id !== "string"){
            throw new AppError(400, "INVALID_TASK_ID", "Invalid task id.");
        }
        const task=await service.getTaskById(id);
        if(!task){
            throw new AppError(404,"TASK_NOT_FOUND","The requested task was not found.")
        }
        res.status(200).json({
            success:true,
            data:task
        });
        
    }

    async function update(req:Request,res:Response):Promise<void>{
     
        const {id}=req.params;
        const input=req.body as UpdateTaskDto;
            // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
        if(typeof id !== "string"){
            throw new AppError(400, "INVALID_TASK_ID", "Invalid task id.");
        }
        const task=await service.updateTask(id,input);

        if(!task){
            throw new AppError(404, "TASK_NOT_FOUND", "The requested task was not found.");
        }
        res.status(200).json({
            success: true, data: task
        })
       
    }


    async function remove(req:Request,res:Response):Promise<void>{
  
        const {id}=req.params;
            // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
        if(typeof id !== "string"){
            throw new AppError(400, "INVALID_TASK_ID", "Invalid task id.");
        }
        const deleted=await service.deleteTask(id);
        if(!deleted){
            throw new AppError(404, "TASK_NOT_FOUND", "The requested task was not found.");
        }
        res.status(204).send()
       
    }

        


    return{
        create,
        getAll,
        getById,
        update,
        remove
    }

}