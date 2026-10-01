import { CreateTaskInput, TaskRepository, UpdateTaskInput } from "../repositories/task.repository.js";
import { Task } from "../types/task.types.js";

export function createTaskService(repository:TaskRepository){
    async function createTask(input:CreateTaskInput):Promise<Task> {
        return repository.create(input)
    }
    async function getAllTasks():Promise<Task[]>{
        return repository.findAll()
    }
    async function getTaskById(id:string):Promise<Task|null> {
        return repository.findById(id)
    }
    async function updateTask(id:string,input:UpdateTaskInput):Promise<Task|null> {
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