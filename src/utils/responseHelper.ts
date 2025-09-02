import { Response } from "express";

export const sendResponse = (res: Response, data?: any, status = 200) => {
    return res.status(status).json({
        success: true,
        data: data ?? null,
    });
};
