import { randomUUID } from "node:crypto";
import { Task } from "../types/task.types.js";
import { CreateTaskInput, TaskRepository, UpdateTaskInput } from "./task.repository.js";

export function createInMemoryTaskRepository():TaskRepository{
    const tasks=new Map<string,Task>();

    async function create(input:CreateTaskInput):Promise<Task>{
        const now=new Date().toISOString();
        const task:Task={
            id:randomUUID(),
            title:input.title,
            description:input.description,
            status:input.status,
            priority:input.priority,
            dueDate:input.dueDate,
            createdAt:now,
            updatedAt:now
        }
        tasks.set(task.id,task);
        return task;
    };

    async function findAll():Promise<Task[]>{
        return Array.from(tasks.values());
    }

    async function findById(id:string):Promise<Task|null>{
        return tasks.get(id)?? null
    }

    async function update(id:string,input:UpdateTaskInput):Promise<Task|null>{
        const existing=tasks.get(id)
        if(!existing){
            return null
        }
        const updated:Task={
            ...existing,
            ...input,
            updatedAt:new Date().toISOString(),
        }
        tasks.set(id,updated)
        return updated
    }

    async function deleteById(id:string):Promise<boolean>{
        return tasks.delete(id);
    }


    return {
        create,
        findAll,
        findById,
        update,
        delete:deleteById
    }
    
}