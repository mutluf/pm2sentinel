import { Router } from "express";
import {getAppsAsync, startAppAsync, stopAppAsync} from "./pm2Controller";
import {asyncHandler} from "../../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getAppsAsync));

router.post("/stop/:appNameOrId", asyncHandler(stopAppAsync));

router.post("/start/:appName",asyncHandler(startAppAsync))
export default router;
