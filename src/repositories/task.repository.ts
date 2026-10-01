import type { Task,TaskStatus,TaskPriority } from "../types/task.types.js";

export type CreateTaskInput={
    title:string;
    description:string | null;
    status: TaskStatus;
    priority:TaskPriority;
    dueDate:string | null;
};

// TypeScript utility type — it takes an object type and makes every property optional
export type UpdateTaskInput=Partial<{
    title:string;
    description:string | null;
    status: TaskStatus;
    priority:TaskPriority;
    dueDate:string | null;
}>

export interface TaskRepository {
    create(input: CreateTaskInput): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, input: UpdateTaskInput): Promise<Task | null>;
    delete(id: string): Promise<boolean>;
  }