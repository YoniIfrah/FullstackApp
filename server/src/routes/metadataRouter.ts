import { Router } from "express";
import { metadataByUrls } from "../controller/metadataController";
import limiter from "../middleware/limiter";

const router = Router();

router.post("/metadata", limiter, metadataByUrls);

export default router;
