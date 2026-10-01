import type { TaskPriority } from "@prisma/client";
import type { Task, TaskStatus } from "../types/task.types.js";

const BASE_URL = "http://127.0.0.1:8000/api/v1/tasks";


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

export async function fetchTaskById(id: string): Promise<Task> {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<Task>(response);
  }

  export async function createTask(input: {
    title: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string | null;
  }): Promise<Task> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return handleResponse<Task>(response);
  }

  export async function updateTask(
    id: string,
    input: Partial<{
      title: string;
      description: string | null;
      status: TaskStatus;
      priority: TaskPriority;
      dueDate: string | null;
    }>,
  ): Promise<Task> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return handleResponse<Task>(response);
  }

  export async function deleteTask(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse<void>(response);
  }