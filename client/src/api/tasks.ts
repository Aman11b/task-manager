import type { Task } from "../types/task.types.js";

const BASE_URL = "http://localhost:8000/api/v1/tasks";


type ApiSuccess<T>={
    success:true;
    data:T
}

type ApiError={
    success:false;
    error:{
        code:string;
        message:string;
        details:unknown[]
    };
}


async function handleResponse<T>(response:Response):Promise<T>{
    if(response.status===204){
        return undefined as T
    }
    const body =(await response.json()) as ApiSuccess<T> | ApiError;

    if(!body.success){
        throw new Error(body.error.message);
    }
    return body.data
}

export async function fetchTasks():Promise<Task[]>{
    const response=await fetch(BASE_URL);
    return handleResponse<Task[]>(response)
}