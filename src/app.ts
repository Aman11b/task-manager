import express from "express"
import type { Request,Response,NextFunction } from "express"

const app=express();

app.use(express.json())

app.get("/health",(_req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        data:{
            status:"UP"
        }
    });
});

app.use((_req:Request,res:Response,_next:NextFunction)=>{
    res.status(404).json({
        success:false,
        error:{
            code:"ROUTE_NOT_FOUND",
            message:"The request route was not found.",
            details:[],
        },
    });
});

export default app