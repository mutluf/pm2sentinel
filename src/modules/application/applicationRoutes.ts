import {Router} from "express";
import {createApplication, getApplications} from "./applicationController";
import {asyncHandler} from "../../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getApplications));
router.post("/", asyncHandler(createApplication));

export default router;