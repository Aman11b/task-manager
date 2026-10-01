import { Router } from "express";
import { createTaskController } from "../controllers/task.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/task.schema.js";

type TaskController=ReturnType<typeof createTaskController>


export function createTaskRoutes(controller:TaskController):Router{
    const router=Router();

    router.post("/",validateBody(CreateTaskSchema),controller.create);
    router.get("/",controller.getAll);
    router.get("/:id",controller.getById);
    router.patch("/:id",validateBody(UpdateTaskSchema),controller.update);
    router.delete("/:id",controller.remove)


    return router

}