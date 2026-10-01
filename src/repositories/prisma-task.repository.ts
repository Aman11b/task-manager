import type { Task as PrismaTask } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type { Task } from "../types/task.types.js";
import type { TaskRepository } from "./task.repository.js";
import type { CreateTaskDto, UpdateTaskDto } from "../schemas/task.schema.js";

function toDomainTask(row: PrismaTask): Task {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      dueDate: row.dueDate ? row.dueDate.toISOString() : null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
}

export function createPrismaTaskRepository():TaskRepository{
    async function create(input:CreateTaskDto):Promise<Task> {
        const row=await prisma.task.create({
            data:{
                title: input.title,
                description: input.description ?? null,
                status: input.status,
                priority: input.priority,
                dueDate: input.dueDate ? new Date(input.dueDate) : null,
            }
        })
        return toDomainTask(row)
    }

    async function findAll():Promise<Task[]>{
        const rows=await prisma.task.findMany({
            orderBy:{createdAt:"desc"}
        });
        return rows.map(toDomainTask)
    }

    async function findById(id:string):Promise<Task |null>{
        const row=await prisma.task.findUnique({where:{id}});
        return row ? toDomainTask(row):null
    }

    async function update(id:string,input:UpdateTaskDto):Promise<Task | null>{
        try{
            const row=await prisma.task.update({
                where:{id},
                data:{
                    title: input.title,
                    description: input.description,
                    status: input.status,
                    priority: input.priority,
                    dueDate:
                      input.dueDate === undefined
                        ? undefined
                        : input.dueDate === null
                          ? null
                          : new Date(input.dueDate),

                },
            });
            return toDomainTask(row)
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==="P2025"){
                return null;
            }
            throw error;
        }

    }
    async function deleteById(id: string): Promise<boolean> {
        try {
          await prisma.task.delete({ where: { id } });
          return true;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return false;
          }
          throw error;
        }
      }


      return {
        create,
        findAll,
        findById,
        update,
        delete:deleteById
      }
}
