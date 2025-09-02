// src/controllers/applicationController.ts
import { Request, Response } from "express";
import {createApplicationAsync, listApplicationsAsync} from "./applicationService";
import {sendResponse} from "../../utils/responseHelper";
import {Application, IApplication} from "../../models/Application";

export const getApplications = async (req: Request, res: Response) => {
    const apps = await listApplicationsAsync();
    sendResponse(res, apps);
}

export const createApplication = async (req: Request, res: Response): Promise<void> => {
    const data :IApplication = req.body;
    const application = await createApplicationAsync(data);
    sendResponse(res, application);
}