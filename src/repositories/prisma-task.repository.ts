import { PrismaClient } from "@prisma/client";
import { TaskRepository } from "./task.repository.js";
import { CreateTaskDto } from "../schemas/task.schema.js";
import { Task } from "../types/task.types.js";

export function createPrismaTaskRepository(prisma:PrismaClient):TaskRepository{
    async function create(input:CreateTaskDto):Promise<Task> {
        return prisma.task.create({data:input})
    }
    return{
        create
    }
}