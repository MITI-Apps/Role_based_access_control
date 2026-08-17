import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import type { Request, Response } from "express";
const router = Router();

router.get("/dashboard", authenticate, authorize(["view_grade"]), (req: Request, res: Response) => {
  console.log("request :", req)
  res.json({
    message: "Welcome."
  });
})

export default router;