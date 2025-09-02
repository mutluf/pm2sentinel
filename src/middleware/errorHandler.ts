import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => { //HOF --> Higher-Order Function
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: (Array.isArray(err) ? err[0] : err)?.message ?? "Internal Server Error"
    });
};
