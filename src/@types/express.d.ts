import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            auth?:{
                 id: string,
                 permissions: string[]
                }
        }
    }
}