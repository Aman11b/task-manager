import type { Request,Response } from "express";
import { createTaskService } from "../services/task.service.js";
import { CreateTaskInput, UpdateTaskInput } from "../repositories/task.repository.js";


type TaskService = ReturnType<typeof createTaskService>;

export function createTaskController(service:TaskService){
    async function create(req:Request,res:Response):Promise<void>{
        try{
            const input=req.body as CreateTaskInput;
            const task=await service.createTask(input);
            res.status(201).json({success:true,data:task})
        }catch{
            res.status(500).json({success:false,error:{
                code:"INTERNAL_SERVER_ERROR",
                message:"Something went wrong.",
                details:[]
            }});
        }
    }

    async function getAll(_req:Request,res:Response):Promise<void> {
        try{
            const tasks=await service.getAllTasks();
            res.status(200).json({success:true,data:tasks});
        }catch{
            res.status(500).json(
                {
                success:false,
                error: { 
                code: "INTERNAL_SERVER_ERROR", 
                message: "Something went wrong.", 
                details: [] },
            })    
        }    
    }


    async function getById(req:Request,res:Response):Promise<void>{
        try{
            const {id}=req.params;
            // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
            if(typeof id !== "string"){
                res.status(400).json({
                success: false,
                error: { code: "INVALID_TASK_ID", message: "Invalid task id.", details: [] },
              });
              return;

            }
            const task=await service.getTaskById(id);
            if(!task){
                res.status(404).json({
                    success:false,
                    error:{
                        code: "TASK_NOT_FOUND", 
                        message: "The requested task was not found.", 
                        details: []
                    }
                });
                return;
            }
            res.status(200).json({
                success:true,
                data:task
            });
        }catch{
            res.status(500).json({
                success:false,
                error:{
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong.",
                    details: []
                }
            })
        }
    }

    async function update(req:Request,res:Response):Promise<void>{
        try{
            const {id}=req.params;
            const input=req.body as UpdateTaskInput;
             // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
             if(typeof id !== "string"){
                res.status(400).json({
                success: false,
                error: { code: "INVALID_TASK_ID", message: "Invalid task id.", details: [] },
              });
              return;

            }
            const task=await service.updateTask(id,input);

            if(!task){
                res.status(404).json
                ({
                    success: false,
                    error: 
                    { 
                        code: "TASK_NOT_FOUND", 
                        message: "The requested task was not found.", 
                        details: [] 
                    }
                })
                return;
            }
            res.status(200).json({
                success: true, data: task
            })
        }
        catch{
            res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong.", details: [] } });
        }
    }


    async function remove(req:Request,res:Response):Promise<void>{
        try{
            const {id}=req.params;
             // TypeScript sees req.params.id as string | string[], even though in a normal /tasks/:id route it will always just be a plain string at runtime.
             if(typeof id !== "string"){
                res.status(400).json({
                success: false,
                error: { code: "INVALID_TASK_ID", message: "Invalid task id.", details: [] },
              });
              return;

            }
            const deleted=await service.deleteTask(id);
            if(!deleted){
                res.status(404).json({ success: false, error: { code: "TASK_NOT_FOUND", message: "The requested task was not found.", details: [] } });
                return;
            }
            res.status(204).send()
        }catch {
            res.status(500).json({ success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong.", details: [] } });
        }
    }

        


    return{
        create,
        getAll,
        getById,
        update,
        remove
    }

}