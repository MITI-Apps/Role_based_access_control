import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import type { Request, Response } from "express";
import logger from "../utils/logger.js";
const router = Router();

router.get("/dashboard", authenticate, authorize(["view_grade"]), (req: Request, res: Response) => {
  logger.info("Dashboard accessed", { userId: (req as any).user?.id });
  res.json({
    message: "Welcome."
  });
})

export default router;