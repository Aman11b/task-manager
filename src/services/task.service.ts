import { AppError } from "../errors/app-error.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { CreateTaskDto, UpdateTaskDto } from "../schemas/task.schema.js";
import { Task } from "../types/task.types.js";

export function createTaskService(repository:TaskRepository){
    async function createTask(input:CreateTaskDto):Promise<Task> {
        return repository.create(input)
    }
    async function getAllTasks():Promise<Task[]>{
        return repository.findAll()
    }
    async function getTaskById(id:string):Promise<Task|null> {
        return repository.findById(id)
    }
    async function updateTask(id:string,input:UpdateTaskDto):Promise<Task|null> {
        const existing=await repository.findById(id);
        if(!existing){
            return null;
        }

        if(existing.status==="COMPLETED" && input.status==="TODO"){
            throw new AppError(
                409,"INVALID_STATUS_TRANSITION","A completed task cannot be moved back to TODO"
            )
        }
        return repository.update(id,input)
        
    }

    async function deleteTask(id:string):Promise<boolean>{
        return repository.delete(id)
    }

    return{
        createTask,
        getAllTasks,
        getTaskById,
        updateTask,
        deleteTask
    }
}