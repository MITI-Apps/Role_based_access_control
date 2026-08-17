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
    const userRoles: number[] = user.roles || [];

    const hasRole = userRoles.some((roleId: number) =>
      allowedRoles.includes(roleId)
    );

    if (!hasRole) {
      return res.status(403).json({
        message: "Access denied."
      });
    }
    next();
  };
};