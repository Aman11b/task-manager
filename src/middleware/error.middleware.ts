import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";

// _next is unused but must still be declared — 
// this is the one case where an unused parameter isn't optional: 
// Express's 4-argument signature check is purely about parameter count, 
// so removing _next entirely would silently turn this back into regular middleware instead of error-handling middleware.

export function errorHandler(
    err:unknown,
    _req:Request,
    res:Response,
    _next:NextFunction,
):void{
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            success:false,
            error:{
                code:err.code,
                message:err.message,
                details:err.details
            }
        })
        return;
    }

    if(err instanceof ZodError){
        res.status(400).json({
            success:false,
            error:{
                code:"VALIDATION_ERROR",
                message:"Request failed validation",
                details:err.issues
            },
        });
        return;
    }

    console.error(err)

    res.status(500).json({
        success:false,
        error:{
            code:"INTERNAL_SERVER_ERROR",
            details:[],
        },
    });
}