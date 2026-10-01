import { Router } from "express";
import { createTaskController } from "../controllers/task.controller.js";

type TaskController=ReturnType<typeof createTaskController>


export function createTaskRoutes(controller:TaskController):Router{
    const router=Router();

    router.post("/",controller.create);
    router.get("/",controller.getAll);
    router.get("/:id",controller.getById);
    router.patch("/:id",controller.update);
    router.delete("/:id",controller.remove)


    return router

}