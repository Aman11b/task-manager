
import {Request,Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validateBody(schema:ZodType){
    return (req:Request,res:Response,next:NextFunction):void=>{
        // .safeParse() lets us handle the invalid case as plain, explicit control flow instead of exception handling — generally clearer for this use case.
        const result=schema.safeParse(req.body);

        if(!result.success){
            res.status(400).json({
                success:false,
                error:{
                    code:"VALIDATION_ERROR",
                    message:"Request body failed validation.",
                    details:result.error.issues,
                },

            });
            return;
        }

        req.body=result.data;
        next()
    }
}