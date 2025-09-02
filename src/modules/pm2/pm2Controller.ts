import { Request, Response } from "express";
import * as pm2Service from "../pm2/pm2Service";
import {sendResponse} from "../../utils/responseHelper";

export const getAppsAsync =async (req: Request, res: Response) => {
    const apps = await pm2Service.listAppsAsync();
    sendResponse(res, apps);
}

export const stopAppAsync = async (req: Request, res: Response): Promise<void> => {
    await pm2Service.stopAppAsync(req.params.appNameOrId);
    res.json({ success: true });
}

export const startAppAsync = async (req: Request, res: Response) => {
    const proc = await pm2Service.startAppAsync(req.params.appName);
    sendResponse(res, proc);
    //res.json({ success: true });
}