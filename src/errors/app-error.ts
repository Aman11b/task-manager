export class AppError extends Error{
    public readonly statusCode:number;
    public readonly code:string;
    public readonly details: unknown[];


    constructor(statusCode:number,code:string,message:string,details:unknown[]=[]){
        // super(message) calls Error's own constructor, which sets this.message and captures the stack trace
        super(message)
        this.statusCode=statusCode;
        this.code=code;
        this.details=details;
        this.name="AppError"
    }
}