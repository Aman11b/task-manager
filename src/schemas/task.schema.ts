import {z} from "zod"

export const TaskStatusEnum=z.enum(["TODO","IN_PROGRESS","COMPLETED"]);
export const TaskPriorityEnum=z.enum(["LOW","MEDIUM","HIGH"]);

export const CreateTaskSchema=z.object({
    title:z.string().min(3).max(100),
    description:z.string().max(1000).nullable().optional(),
    status: TaskStatusEnum.optional().default("TODO"),
    priority:TaskPriorityEnum.optional().default("MEDIUM"),
    dueDate:z.iso.datetime().nullable().optional(),
}).strict();
// Strict -> Applied to the whole object — rejects any extra, unrecognized keys in the request body.

export const UpdateTaskSchema=z.object({
    title:z.string().min(3).max(100).optional(),
    description:z.string().max(1000).nullable().optional(),
    status: TaskStatusEnum.optional(),
    priority:TaskPriorityEnum.optional(),
    dueDate:z.iso.datetime().nullable().optional(),

}).strict().refine((data)=>Object.keys(data).length>0,{
    message:"At least one filed must be provided for update"
})
// .refine() is Zod's way to add a custom validation rule beyond the built-in ones
// z.infer<typeof Schema> is Zod's own utility — it derives a TypeScript type directly from the schema
export type CreateTaskDto=z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto=z.infer<typeof UpdateTaskSchema>;