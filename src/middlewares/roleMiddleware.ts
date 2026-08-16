import type { NextFunction, Request, Response } from "express";

export const authorize = (
  allowedRoles: number[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;

    if (
      !allowedRoles.includes(user.roleId)
    ) {
      return res.status(403).json({
        message: "Access denied."
      });
    }

    next();
  };
};